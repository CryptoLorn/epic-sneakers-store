import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { BrandsService } from "./brands.service";
import { BrandsController } from "./brands.controller";
import { Brands } from "./brands.model";

@Module({
  providers: [BrandsService],
  controllers: [BrandsController],
  imports: [SequelizeModule.forFeature([Brands])]
})
export class BrandsModule {}
