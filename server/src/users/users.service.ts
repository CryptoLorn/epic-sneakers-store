import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcryptjs";

import { User } from "./users.model";
import { AuthDto } from "../auth/dto/auth.dto";
import { IUser } from "../core/interfaces/user.interface";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async create(userDto: AuthDto): Promise<IUser> {
        const candidate = await this.getUserByEmail(userDto.email);

        if (candidate) {
            throw new HttpException("User with this email is already exist", HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password, 7);

        return await this.userRepository.create({...userDto, password: hashPassword});
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
        return await this.userRepository.findOne({where: {email}});
    }

    async getUserById(id: number): Promise<IUser> {
        return await this.userRepository.findOne({where: {id}});
    }
}
