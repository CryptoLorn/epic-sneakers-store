import { Injectable, UnauthorizedException } from "@nestjs/common";

import { UsersService } from "../users/users.service";
import { TokensService } from "../tokens/tokens.service";
import { AuthDto } from "./dto/auth.dto";
import { IUserResponse } from "../users/interfaces/user.interface";

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private tokenService: TokensService) {}

    async registration(userDto: AuthDto): Promise<IUserResponse> {
        const user = await this.userService.create(userDto);

        const tokens = await this.tokenService.generateTokens(user);
        await this.tokenService.saveTokens({...tokens, userId: user.id});

        return {...tokens, user};
    }

    async login(userDto: AuthDto): Promise<IUserResponse> {
        const user = await this.userService.checkIsUserPresent(userDto);

        const tokens = await this.tokenService.generateTokens(user);
        await this.tokenService.saveTokens({...tokens, userId: user.id});

        return {...tokens, user};
    }

    async refresh(refreshToken: string): Promise<IUserResponse> {
        if (!refreshToken) {
            throw new UnauthorizedException({message: "Unauthorized"});
        }

        const tokenFromDB = await this.tokenService.findOneByToken(refreshToken);
        const user = await this.userService.getUserById(tokenFromDB.userId);

        const tokens = await this.tokenService.generateTokens(user);
        await this.tokenService.saveTokens({...tokens, userId: user.id});

        return {...tokens, user};
    }
}
