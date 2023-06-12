import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtService } from "@nestjs/jwt";

import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { Orders } from "./orders.model";
import { UsersService } from "../users/users.service";
import { User } from "../users/users.model";
import { TokensService } from "../tokens/tokens.service";
import { ActionTokenService } from "../actionToken/actionToken.service";
import { MailService } from "../mail/mail.service";
import { BasketsService } from "../baskets/baskets.service";
import { Baskets } from "../baskets/baskets.model";
import { Tokens } from "../tokens/tokens.model";
import { ActionToken } from "../actionToken/actionToken.model";

@Module({
  controllers: [OrdersController],
  providers: [
      OrdersService,
    BasketsService,
    JwtService,
    UsersService,
    TokensService,
    ActionTokenService,
    MailService],
  imports: [
    SequelizeModule.forFeature([Orders, Baskets, User, Tokens, ActionToken])
  ]
})
export class OrdersModule {}
