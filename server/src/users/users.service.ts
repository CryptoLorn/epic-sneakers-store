import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import * as bcrypt from "bcryptjs";
import * as uuid from "uuid";

import { User } from "./users.model";
import { AuthDto } from "../auth/dto/auth.dto";
import { IUser } from "./interfaces/user.interface";
import { UpdateDto } from "./dto/update.dto";
import { TokensService } from "../tokens/tokens.service";
import { ActionTokenService } from "../actionToken/actionToken.service";
import { MailService } from "../mail/mail.service";
import { constant } from "../core/constants/constant";
import { BasketsService } from "../baskets/baskets.service";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User)
                private userRepository: typeof User,
                private tokenService: TokensService,
                private actionTokenService: ActionTokenService,
                private mailService: MailService,
                private basketService: BasketsService) {}

    async create(userDto: AuthDto): Promise<IUser> {
        const candidate = await this.getUserByEmail(userDto.email);

        if (candidate) {
            throw new HttpException("User with this email is already exist", HttpStatus.BAD_REQUEST);
        }

        const isAdmin = await this.userRepository.findOne({where: {role: constant.ADMIN}});

        if (isAdmin && userDto.role === constant.ADMIN) {
            throw new HttpException("Failed to register", HttpStatus.BAD_REQUEST);
        }

        const activationLink = uuid.v4();
        const hashPassword = await bcrypt.hash(userDto.password, 7);

        let user;
        if (isAdmin) {
            user = await this.userRepository.create(
                {
                    ...userDto,
                    password: hashPassword,
                    activation_link: activationLink
                });
        } else {
            user = await this.userRepository.create(
                {
                    ...userDto,
                    password: hashPassword,
                    role: constant.ADMIN,
                    activation_link: activationLink
                });
        }
        await this.basketService.create(user.id);

        return await this.userRepository.findOne({where: {email: user.email}, include: "basket"});
    }

    async checkIsUserPresent(dto: AuthDto): Promise<IUser> {
        const user = await this.getUserByEmail(dto.email);

        if (!user) {
            throw new NotFoundException({message: "Not found user with this email"});
        }

        const passwordEquals = await bcrypt.compare(dto.password, user.password);

        if (!passwordEquals) {
            throw new UnauthorizedException({message: "Invalid email or password"});
        }

        return user;
    }

    async getUserByEmail(email: string): Promise<IUser> {
        return await this.userRepository.findOne({where: {email}, include: "basket"});
    }

    async getUserById(id: number): Promise<IUser> {
        return await this.userRepository.findOne({where: {id}, include: "basket"});
    }

    async activate(activationLink: string): Promise<void> {
        const user = await this.userRepository.findOne({where: {activation_link: activationLink}});

        if (!user) {
            throw new NotFoundException({message: "Invalid link"});
        }

        user.is_activated = true;
        await user.save();
    }

    async getAll(id: number): Promise<IUser[]> {
        return await this.userRepository.findAll({where: {id: {[Op.ne]: id}}});
    }

    async updateById(id: number, data: UpdateDto): Promise<[number]> {
        return await this.userRepository.update(data, {where: {id}});
    }

    async forgotPassword(email: string): Promise<string> {
        const user = await this.getUserByEmail(email);

        if (!user) {
            throw new NotFoundException({message: "Not found user with this email"});
        }

        const actionToken = this.tokenService.createActionToken(
            constant.FORGOT_PASSWORD_TOKEN, {id: user.id}
        );

        await this.mailService.sendEmail(
            user.email,
            constant.FORGOT_PASS,
            actionToken
        );
        await this.actionTokenService.saveActionTokenToDB({
            token: actionToken,
            token_type: constant.FORGOT_PASSWORD_TOKEN,
            userId: user.id
        });

        return "ok";
    }

    async setNewPassword(token: string, password: string): Promise<string> {
        if (password.length < 3 || password.length > 15) {
            throw new HttpException("Password not valid", HttpStatus.BAD_REQUEST);
        }

        this.tokenService.checkToken(token);
        const tokenInfo = await this.actionTokenService.getOneByParams(
            token,
            constant.FORGOT_PASSWORD_TOKEN
        );

        if (!tokenInfo) {
            throw new NotFoundException({message: "Token not valid"});
        }

        let userId = tokenInfo.userId;
        await this.tokenService.deleteById(userId);
        await this.actionTokenService.deleteOne(token);

        const hashPassword = await bcrypt.hash(password, 7);

        await this.userRepository.update({password: hashPassword}, {where: {id: userId}});

        return "ok";
    }

    async deleteById(id: number): Promise<number> {
        await this.basketService.deleteById(id);
        await this.tokenService.deleteById(id);

        return await this.userRepository.destroy({where: {id}});
    }
}
