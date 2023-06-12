import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { BasketsController } from "./baskets.controller";
import { BasketsService } from "./baskets.service";
import { Baskets } from "./baskets.model";
import { OrdersService } from "../orders/orders.service";
import { Orders } from "../orders/orders.model";

@Module({
  controllers: [BasketsController],
  providers: [BasketsService, OrdersService],
  imports: [
      SequelizeModule.forFeature([Baskets, Orders])
  ]
})
export class BasketsModule {}
