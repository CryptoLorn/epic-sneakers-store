import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { User } from "./users.model";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthModule } from "../auth/auth.module";
import { TokensService } from "../tokens/tokens.service";
import { ActionTokenService } from "../actionToken/actionToken.service";
import { MailService } from "../mail/mail.service";
import { Tokens } from "../tokens/tokens.model";
import { ActionToken } from "../actionToken/actionToken.model";

@Module({
    controllers: [UsersController],
    providers: [UsersService, TokensService, ActionTokenService, MailService],
    imports: [
        SequelizeModule.forFeature([User, Tokens, ActionToken]),
        forwardRef(() => AuthModule),
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule {}
