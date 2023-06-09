import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { User } from "./users.model";
import { Baskets } from "../baskets/baskets.model";
import { Tokens } from "../tokens/tokens.model";
import { ActionToken } from "../actionToken/actionToken.model";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { BasketsService } from "../baskets/baskets.service";
import { AuthModule } from "../auth/auth.module";
import { TokensService } from "../tokens/tokens.service";
import { ActionTokenService } from "../actionToken/actionToken.service";
import { MailService } from "../mail/mail.service";
import { OrdersService } from "../orders/orders.service";
import { Orders } from "../orders/orders.model";

@Module({
    controllers: [UsersController],
    providers: [
        UsersService,
        BasketsService,
        OrdersService,
        TokensService,
        ActionTokenService,
        MailService],
    imports: [
        SequelizeModule.forFeature([User, Baskets, Orders, Tokens, ActionToken]),
        forwardRef(() => AuthModule),
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule {}
