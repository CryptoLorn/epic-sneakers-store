import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";

import { UsersModule } from "./users/users.module";
import { User } from "./users/users.model";
import { Baskets } from "./baskets/baskets.model";
import { Tokens } from "./tokens/tokens.model";
import { AuthModule } from "./auth/auth.module";
import { TokensModule } from "./tokens/tokens.module";
import { MailModule } from "./mail/mail.module";
import { ActionTokenModule } from "./actionToken/actionToken.module";
import { ActionToken } from "./actionToken/actionToken.model";
import { BasketsModule } from "./baskets/baskets.module";
import { OrdersModule } from "./orders/orders.module";
import { Orders } from "./orders/orders.model";
import { BrandsModule } from "./brands/brands.module";
import { Brands } from "./brands/brands.model";
import { TypesModule } from "./types/types.module";
import { Types } from "./types/types.model";
import { BrandsTypes } from "./brands/brandsTypes.model";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env"
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Baskets, Orders, Tokens, ActionToken, Brands, Types, BrandsTypes],
      autoLoadModels: true
    }),
    UsersModule,
    AuthModule,
    TokensModule,
    MailModule,
    ActionTokenModule,
    BasketsModule,
    OrdersModule,
    BrandsModule,
    TypesModule
  ]
})
export class AppModule {}