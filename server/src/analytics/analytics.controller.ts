import { Body, Controller, Get, Param, Put } from "@nestjs/common";

import { AnalyticsService } from "./analytics.service";
import { IAnalytics } from "./interfaces/analytics.interface";
import { UpdateDto } from "./dto/update.dto";

@Controller("analytics")
export class AnalyticsController {
    constructor(private analyticsService: AnalyticsService) {}

    @Get()
    async getAll(): Promise<IAnalytics[]> {
        return await this.analyticsService.getAll();
    }

    @Put("/:id")
    async updateById(@Param("id") id: number, @Body() analytics: UpdateDto): Promise<[number]> {
        return await this.analyticsService.updateById(id, analytics);
    }
}
