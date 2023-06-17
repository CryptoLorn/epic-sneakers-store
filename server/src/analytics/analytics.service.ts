import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Analytics } from "./analytics.model";
import { IAnalytics } from "./interfaces/analytics.interface";
import { UpdateDto } from "./dto/update.dto";

@Injectable()
export class AnalyticsService {
    constructor(@InjectModel(Analytics)
    private analyticsRepository: typeof Analytics) {}

    async create(sneakersId: number): Promise<IAnalytics> {
        return await this.analyticsRepository.create({sneakersId});
    }

    async getAll(): Promise<IAnalytics[]> {
        return await this.analyticsRepository.findAll();
    }

    async updateById(id: number, analytics: UpdateDto): Promise<[number]> {
        return await this.analyticsRepository.update(analytics, {where: {sneakersId: id}});
    }

    async deleteById(id: number): Promise<number> {
        return await this.analyticsRepository.destroy({where: {sneakersId: id}});
    }
}
