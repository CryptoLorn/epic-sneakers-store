import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { JwtService } from "@nestjs/jwt";

import { Tokens } from "./tokens.model";
import { TokensDto } from "./dto/tokens.dto";
import { IToken, ITokenResponse } from "./interfaces/token.interface";
import { IUser } from "../users/interfaces/user.interface";
import { constant } from "../core/constants/constant";

@Injectable()
export class TokensService {
    constructor(@InjectModel(Tokens)
                private tokenRepository: typeof Tokens,
                private jwtService: JwtService) {}

    async generateTokens(user: IUser): Promise<IToken> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.sign(
                {
                    sub: user.id,
                    email: user.email,
                    role: user.role
                },
                {
                    secret: process.env.ACCESS_KEY,
                    expiresIn: "24h"
                }),

            this.jwtService.sign(
                {
                    sub: user.id,
                    email: user.email,
                    role: user.role
                },
                {
                    secret: process.env.REFRESH_KEY,
                    expiresIn: "30d"
                })
        ])

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }

    async saveTokens(tokens: TokensDto): Promise<ITokenResponse> {
        const tokensData = await this.tokenRepository.findOne({where: {userId: tokens.userId}});

        if (tokensData) {
            tokensData.access_token = tokens.access_token;
            tokensData.refresh_token = tokens.refresh_token;
            return tokensData.save();
        }

        return this.tokenRepository.create(tokens);
    }

    async findOneByToken(refreshToken: string): Promise<ITokenResponse> {
        const tokenFromDB = await this.tokenRepository.findOne({where: {refresh_token: refreshToken}});

        if (!tokenFromDB) {
            throw new UnauthorizedException({message: "Unauthorized"});
        }

        return tokenFromDB;
    }

    async deleteTokens(refreshToken: string): Promise<number> {
        if (!refreshToken) {
            throw new UnauthorizedException({message: "Unauthorized"});
        }

        return await this.tokenRepository.destroy({where: {refresh_token: refreshToken}});
    }

    createActionToken(tokenType: string, payload = {}): string {
        let expiresIn = "1d";

        if (tokenType === constant.FORGOT_PASSWORD_TOKEN) {
            expiresIn = "7d";
        }

        return this.jwtService.sign(payload,{secret: process.env.ACTION_TOKEN_SECRET, expiresIn});
    }

    checkToken(token: string): {id: number} {
        try {
            return this.jwtService.verify(token, {secret: process.env.ACTION_TOKEN_SECRET});
        } catch (e) {
            throw new HttpException("Token not valid", HttpStatus.BAD_REQUEST);
        }
    }

    async deleteById(id: number): Promise<number> {
        return await this.tokenRepository.destroy({where: {userId: id}});
    }
}
