import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtService } from "@nestjs/jwt";

import { SneakersController } from "./sneakers.controller";
import { SneakersService } from "./sneakers.service";
import { Sneakers } from "./sneakers.model";
import { FilesService } from "../files/files.service";
import { AnalyticsService } from "../analytics/analytics.service";
import { OrdersService } from "../orders/orders.service";
import { Analytics } from "../analytics/analytics.model";
import { Orders } from "../orders/orders.model";
import { UsersService } from "../users/users.service";
import { User } from "../users/users.model";
import { TokensService } from "../tokens/tokens.service";
import { Tokens } from "../tokens/tokens.model";
import { ActionToken } from "../actionToken/actionToken.model";
import { ActionTokenService } from "../actionToken/actionToken.service";
import { MailService } from "../mail/mail.service";
import { BasketsService } from "../baskets/baskets.service";
import { Baskets } from "../baskets/baskets.model";
import { Img } from "../imgs/img.model";
import { ImgsService } from "../imgs/imgs.service";

@Module({
  controllers: [SneakersController],
  providers: [
    SneakersService,
    AnalyticsService,
    OrdersService,
    FilesService,
    JwtService,
    UsersService,
    TokensService,
    ActionTokenService,
    MailService,
    BasketsService,
    ImgsService
  ],
  imports: [SequelizeModule.forFeature([
    Sneakers,
    Img,
    Analytics,
    Orders,
    User,
    Tokens,
    ActionToken,
    Baskets
  ])]
})
export class SneakersModule {}
