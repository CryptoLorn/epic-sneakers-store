import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtModule } from "@nestjs/jwt";

import { TypesController } from "./types.controller";
import { TypesService } from "./types.service";
import { Types } from "./types.model";
import { UsersService } from "../users/users.service";
import { TokensService } from "../tokens/tokens.service";
import { ActionTokenService } from "../actionToken/actionToken.service";
import { MailService } from "../mail/mail.service";
import { BasketsService } from "../baskets/baskets.service";
import { OrdersService } from "../orders/orders.service";
import { User } from "../users/users.model";
import { Tokens } from "../tokens/tokens.model";
import { ActionToken } from "../actionToken/actionToken.model";
import { Baskets } from "../baskets/baskets.model";
import { Orders } from "../orders/orders.model";

@Module({
  controllers: [TypesController],
  providers: [
      TypesService,
      UsersService,
      TokensService,
      ActionTokenService,
      MailService,
      BasketsService,
      OrdersService
  ],
  imports: [
      SequelizeModule.forFeature([Types, User, Tokens, ActionToken, Baskets, Orders]),
      JwtModule
  ]
})
export class TypesModule {}
