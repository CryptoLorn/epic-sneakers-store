import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

import { AuthService } from "./auth.service";
import { TokensService } from "../tokens/tokens.service";
import { MailService } from "../mail/mail.service";
import { AuthDto } from "./dto/auth.dto";
import { constant } from "../core/constants/constant";
import { IUserResponse } from "../core/interfaces/user.interface";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService,
                private tokenService: TokensService,
                private mailService: MailService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post("signup")
    async registration(@Body() userDto: AuthDto, @Res({ passthrough: true }) res: Response
    ): Promise<IUserResponse> {
        const tokens = await this.authService.registration(userDto);

        await this.mailService.sendEmail(
            tokens.user.email,
            constant.ACTIVATION_LINK,
            tokens.user.activation_link
        );

        res.cookie(
            constant.REFRESH_TOKEN,
            tokens.refresh_token,
            {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

        return tokens;
    }

    @HttpCode(HttpStatus.OK)
    @Post("login")
    async login(@Body() userDto: AuthDto, @Res({ passthrough: true }) res: Response
    ): Promise<IUserResponse> {
        const tokens = await this.authService.login(userDto);

        res.cookie(
            constant.REFRESH_TOKEN,
            tokens.refresh_token,
            {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

        return tokens;
    }

    @HttpCode(HttpStatus.OK)
    @Get("refresh")
    async refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response
    ): Promise<IUserResponse> {
        const {refresh_token} = req.cookies;

        const tokens = await this.authService.refresh(refresh_token);

        res.cookie(
            constant.REFRESH_TOKEN,
            tokens.refresh_token,
            {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

        return tokens;
    }

    @HttpCode(HttpStatus.OK)
    @Post("logout")
    async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response
    ): Promise<number> {
        const {refresh_token} = req.cookies;

        const token = await this.tokenService.deleteTokens(refresh_token);
        res.clearCookie(constant.REFRESH_TOKEN);

        return token;
    }
}
