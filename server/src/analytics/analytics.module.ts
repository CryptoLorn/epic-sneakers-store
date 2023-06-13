import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { AnalyticsController } from "./analytics.controller";
import { AnalyticsService } from "./analytics.service";
import { Analytics } from "./analytics.model";

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  imports: [SequelizeModule.forFeature([Analytics])]
})
export class AnalyticsModule {}
