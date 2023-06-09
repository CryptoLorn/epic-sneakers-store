import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";

import { UsersModule } from "./users/users.module";
import { User } from "./users/users.model";
import { AuthModule } from "./auth/auth.module";
import { TokensModule } from "./tokens/tokens.module";
import { Tokens } from "./tokens/tokens.model";
import { MailModule } from "./mail/mail.module";
import { ActionTokenModule } from "./actionToken/actionToken.module";
import { ActionToken } from "./actionToken/actionToken.model";

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
      models: [User, Tokens, ActionToken],
      autoLoadModels: true
    }),
    UsersModule,
    AuthModule,
    TokensModule,
    MailModule,
    ActionTokenModule
  ]
})
export class AppModule {}