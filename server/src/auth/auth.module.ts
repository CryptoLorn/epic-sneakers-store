import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { TokensModule } from "../tokens/tokens.module";
import { AccessTokenStrategy } from "./strategies/accessToken.strategy";
import { RefreshTokenStrategy } from "./strategies/refreshToken.strategy";
import { MailService } from "../mail/mail.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, MailService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule,
    TokensModule
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
