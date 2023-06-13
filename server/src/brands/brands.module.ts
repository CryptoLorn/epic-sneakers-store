import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtModule } from "@nestjs/jwt";

import { BrandsService } from "./brands.service";
import { BrandsController } from "./brands.controller";
import { Brands } from "./brands.model";
import { UsersService } from "../users/users.service";
import { User } from "../users/users.model";
import { TokensService } from "../tokens/tokens.service";
import { Tokens } from "../tokens/tokens.model";
import { ActionTokenService } from "../actionToken/actionToken.service";
import { ActionToken } from "../actionToken/actionToken.model";
import { MailService } from "../mail/mail.service";
import { BasketsService } from "../baskets/baskets.service";
import { Baskets } from "../baskets/baskets.model";
import { OrdersService } from "../orders/orders.service";
import { Orders } from "../orders/orders.model";

@Module({
  providers: [
    BrandsService,
    UsersService,
    TokensService,
    ActionTokenService,
    MailService,
    BasketsService,
    OrdersService
  ],
  controllers: [BrandsController],
  imports: [
    SequelizeModule.forFeature([Brands, User, Tokens, ActionToken, Baskets, Orders]),
    JwtModule
  ]
})
export class BrandsModule {}
