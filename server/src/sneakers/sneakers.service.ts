import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import * as path from "path";
import * as fs from "fs";

import { Sneakers } from "./sneakers.model";
import { CreateDto } from "./dto/create.dto";
import { ISneakers, ISneakersResponse } from "./interfaces/sneakers.interface";
import { AnalyticsService } from "../analytics/analytics.service";
import { OrdersService } from "../orders/orders.service";
import { FilesService}  from "../files/files.service";
import { IParams } from "./interfaces/params.interface";
import { UpdateDto } from "./dto/update.dto";

@Injectable()
export class SneakersService {
    constructor(@InjectModel(Sneakers)
                private sneakersRepository: typeof Sneakers,
                private analyticsService: AnalyticsService,
                private ordersService: OrdersService,
                private fileService: FilesService) {}

    async create(sneakers: CreateDto, img: any): Promise<ISneakers> {
        const fileName = await this.fileService.createFile(img);

        return await this.sneakersRepository.create({...sneakers, img: fileName});
    }

    async getAll(params: IParams): Promise<ISneakersResponse> {
        params.page = params.page || 1
        params.limit = params.limit || 9
        let offset = params.page * params.limit - params.limit;

        if (!params.brandId && !params.typeId) {
            return await this.sneakersRepository.findAndCountAll({
                limit: params.limit,
                offset
            });
        }

        if (params.brandId && !params.typeId) {
            return await this.sneakersRepository.findAndCountAll({
                where: {brandId: params.brandId},
                limit: params.limit,
                offset
            });
        }

        if (!params.brandId && params.typeId) {
            return await this.sneakersRepository.findAndCountAll({
                where: {typeId: params.typeId},
                limit: params.limit,
                offset
            });
        }

        if (params.brandId && params.typeId) {
            return await this.sneakersRepository.findAndCountAll({
                where: {typeId: params.typeId, brandId: params.brandId},
                limit: params.limit,
                offset
            });
        }
    }

    async getById(id: number): Promise<ISneakers> {
        const sneakers = await this.sneakersRepository.findByPk(id);

        if (!sneakers) {
            throw new NotFoundException({message: "Not found sneakers"});
        }

        return sneakers;
    }

    async updateById(id: number, dto: UpdateDto): Promise<[number]> {
        await this.getById(id);

        return await this.sneakersRepository.update({price: dto.price}, {where: {id}});
    }

    async deleteById(id: number): Promise<number> {
        const sneakers = await this.getById(id);

        await this.analyticsService.deleteById(id);
        await this.ordersService.deleteAllBySneakersId(id);

        const fullPath = path.resolve(__dirname);
        const parsePath = path.parse(fullPath);
        const dirPath = parsePath.dir;

        await fs.unlink(`${dirPath}/static/${sneakers.img}`, (err) => {
            if (err) {
                throw new NotFoundException({message: "Path not found"});
            }
        })

        return await this.sneakersRepository.destroy({where: {id}});
    }

    async getAllBySearching(searchParam: string): Promise<ISneakers[]> {
        return await this.sneakersRepository.findAll({
            where: {
                [Op.or]: [
                    {brand_name: {[Op.iLike]: `%${searchParam}%`}},
                    {model: {[Op.iLike]: `%${searchParam}%`}}
                ]
            }
        });
    }
}
