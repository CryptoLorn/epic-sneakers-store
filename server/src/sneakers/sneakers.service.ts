import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
// import * as path from "path";
// import * as fs from "fs";

import { Sneakers } from "./sneakers.model";
import { CreateDto } from "./dto/create.dto";
import { ISneakers, ISneakersResponse } from "./interfaces/sneakers.interface";
import { AnalyticsService } from "../analytics/analytics.service";
import { OrdersService } from "../orders/orders.service";
import { FilesService}  from "../files/files.service";
import { IParams } from "./interfaces/params.interface";
import { UpdateDto } from "./dto/update.dto";
import { sneakersMapper } from "./mappers/sneakers.mapper";

@Injectable()
export class SneakersService {
    constructor(@InjectModel(Sneakers)
                private sneakersRepository: typeof Sneakers,
                private analyticsService: AnalyticsService,
                private ordersService: OrdersService,
                private fileService: FilesService) {}

    async create(sneakersDto: CreateDto, img: any): Promise<ISneakers> {
        if (!img) {
            throw new HttpException("File not found", HttpStatus.BAD_REQUEST);
        }

        const filePath = await this.fileService.upload(img);
        // Збереження картинок в локальну папку
        // const fileName = await this.fileService.createFile(img);

        const sneakers = await this.sneakersRepository.create({...sneakersDto, img: filePath});
        await this.analyticsService.create(sneakers.id);

        // Повертаємо поля які вказали в mapper
        return sneakersMapper.toResponse(sneakers);
    }

    async getAll(params: IParams): Promise<ISneakersResponse> {
        params.page = params.page || 1
        params.limit = params.limit || 9
        let offset = params.page * params.limit - params.limit;

        let response;
        if (!params.brandId && !params.typeId) {
            response = await this.sneakersRepository.findAndCountAll({
                limit: params.limit,
                offset
            });
        }

        if (params.brandId && !params.typeId) {
            response = await this.sneakersRepository.findAndCountAll({
                where: {brandId: params.brandId},
                limit: params.limit,
                offset
            });
        }

        if (!params.brandId && params.typeId) {
            response = await this.sneakersRepository.findAndCountAll({
                where: {typeId: params.typeId},
                limit: params.limit,
                offset
            });
        }

        if (params.brandId && params.typeId) {
            response = await this.sneakersRepository.findAndCountAll({
                where: {typeId: params.typeId, brandId: params.brandId},
                limit: params.limit,
                offset
            });
        }

        return {
            count: response.count,
            rows: sneakersMapper.toManyResponse(response.rows)
        };
    }

    async getById(id: number): Promise<ISneakers> {
        const sneakers = await this.sneakersRepository.findByPk(id);

        if (!sneakers) {
            throw new NotFoundException({message: "Not found sneakers"});
        }

        return sneakersMapper.toResponse(sneakers);
    }

    async updateById(id: number, dto: UpdateDto): Promise<[number]> {
        await this.getById(id);

        return await this.sneakersRepository.update({price: dto.price}, {where: {id}});
    }

    async deleteById(id: number): Promise<number> {
        const sneakers = await this.sneakersRepository.findByPk(id);

        await this.analyticsService.deleteById(id);
        await this.ordersService.deleteAllBySneakersId(id);

        // Видалення картинок з локальної папки
        // const fullPath = path.resolve(__dirname);
        // const parsePath = path.parse(fullPath);
        // const dirPath = parsePath.dir;
        //
        // await fs.unlink(`${dirPath}/static/${sneakers.img}`, (err) => {
        //     if (err) {
        //         throw new NotFoundException({message: "Path not found"});
        //     }
        // })

        await this.fileService.deleteFile(sneakers.img);
        return await this.sneakersRepository.destroy({where: {id}});
    }

    async getAllBySearching(searchParam: string): Promise<ISneakers[]> {
        const sneakers = await this.sneakersRepository.findAll({
            where: {
                [Op.or]: [
                    {brand_name: {[Op.iLike]: `%${searchParam}%`}},
                    {model: {[Op.iLike]: `%${searchParam}%`}}
                ]
            }
        });

        return sneakersMapper.toManyResponse(sneakers);
    }
}
