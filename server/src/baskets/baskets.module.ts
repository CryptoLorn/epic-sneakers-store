import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { BasketsController } from "./baskets.controller";
import { BasketsService } from "./baskets.service";
import { Baskets } from "./baskets.model";

@Module({
  controllers: [BasketsController],
  providers: [BasketsService],
  imports: [
      SequelizeModule.forFeature([Baskets])
  ]
})
export class BasketsModule {}
