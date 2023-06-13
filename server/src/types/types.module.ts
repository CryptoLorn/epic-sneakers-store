import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { TypesController } from "./types.controller";
import { TypesService } from "./types.service";
import { Types } from "./types.model";

@Module({
  controllers: [TypesController],
  providers: [TypesService],
  imports: [SequelizeModule.forFeature([Types])]
})
export class TypesModule {}
