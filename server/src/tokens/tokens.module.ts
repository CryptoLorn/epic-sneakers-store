import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtModule } from "@nestjs/jwt";

import { Tokens } from "./tokens.model";
import { TokensService } from "./tokens.service";

@Module({
  controllers: [],
  providers: [TokensService],
  imports: [
    SequelizeModule.forFeature([Tokens]),
    JwtModule.register({})
  ],
  exports: [
    TokensService,
    JwtModule
  ]
})
export class TokensModule {}
