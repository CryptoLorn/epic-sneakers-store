import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { ImgsService } from "./imgs.service";
import { Img } from "./img.model";

@Module({
  controllers: [],
  providers: [ImgsService],
  imports: [SequelizeModule.forFeature([Img])],
  exports: [ImgsService]
})
export class ImgsModule {}
