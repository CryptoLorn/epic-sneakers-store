import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException
} from "@nestjs/common";
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
import { ImgsService } from "../imgs/imgs.service";

@Injectable()
export class SneakersService {
    constructor(@InjectModel(Sneakers)
                private sneakersRepository: typeof Sneakers,
                private analyticsService: AnalyticsService,
                private ordersService: OrdersService,
                private fileService: FilesService,
                private imgService: ImgsService) {}

    async create(sneakersDto: CreateDto, img: Express.Multer.File[]): Promise<ISneakers> {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

        if (img.length === 0) {
            throw new HttpException({message: "File not found"}, HttpStatus.BAD_REQUEST);
        }

        for (const image of img) {
            if (!allowedTypes.includes(image.mimetype)) {
                throw new BadRequestException(
                    {
                        message: "Invalid file type. Only JPEG, JPG, PNG, and WEBP images are allowed"
                    }
                );
            }
        }

        // Save image in local folder
        // const fileName = await this.fileService.createFile(img);

        const sneakers = await this.sneakersRepository.create({...sneakersDto});

        for (let i = 0; i < img.length; i++) {
            const filePath = await this.fileService.upload(img[i]);
            await this.imgService.create(filePath, sneakers.id);
        }

        const sneakersWithImg = await this.getById(sneakers.id);

        await this.analyticsService.create(sneakers.id);

        // Return the fields specified in the mapper
        return sneakersMapper.toResponse(sneakersWithImg);
    }

    async getAll(params: IParams): Promise<ISneakersResponse> {
        params.page = params.page || 1
        params.limit = params.limit || 9
        let offset = params.page * params.limit - params.limit;

        const allSneakers = await this.sneakersRepository.findAndCountAll();

        let response;
        if (!params.brandId && !params.typeId) {
            response = await this.sneakersRepository.findAndCountAll({
                limit: params.limit,
                offset,
                include: "img"
            });
        }

        if (params.brandId && !params.typeId) {
            response = await this.sneakersRepository.findAndCountAll({
                where: {brandId: params.brandId},
                limit: params.limit,
                offset,
                include: "img"
            });
        }

        if (!params.brandId && params.typeId) {
            response = await this.sneakersRepository.findAndCountAll({
                where: {typeId: params.typeId},
                limit: params.limit,
                offset,
                include: "img"
            });
        }

        if (params.brandId && params.typeId) {
            response = await this.sneakersRepository.findAndCountAll({
                where: {typeId: params.typeId, brandId: params.brandId},
                limit: params.limit,
                offset,
                include: "img"
            });
        }

        return {
            count: allSneakers.count,
            rows: sneakersMapper.toManyResponse(response.rows)
        };
    }

    async getById(id: number): Promise<ISneakers> {
        const sneakers = await this.sneakersRepository.findOne({where: {id}, include: "img"});

        if (!sneakers) {
            throw new NotFoundException({message: "Not found sneakers"});
        }

        return sneakersMapper.toResponse(sneakers);
    }

    async updateById(id: number, dto: UpdateDto): Promise<[number]> {
        await this.getById(id);

        return await this.sneakersRepository.update({price: dto.price}, {where: {id}});
    }

    async deleteById(id: number) {
        const sneakers = await this.getById(id);

        await this.analyticsService.deleteById(id);
        await this.ordersService.deleteAllBySneakersId(id);
        await this.imgService.deleteById(id);

        for (let i = 0; i < sneakers.img.length; i++) {
            await this.fileService.deleteFile(sneakers.img[i].path);
        }

        // Delete image from local folder
        // const fullPath = path.resolve(__dirname);
        // const parsePath = path.parse(fullPath);
        // const dirPath = parsePath.dir;
        //
        // await fs.unlink(`${dirPath}/static/${sneakers.img}`, (err) => {
        //     if (err) {
        //         throw new NotFoundException({message: "Path not found"});
        //     }
        // })

        return await this.sneakersRepository.destroy({where: {id}});
    }

    async getAllBySearching(searchParam: string): Promise<ISneakers[]> {
        const sneakers = await this.sneakersRepository.findAll({
            where: {
                [Op.or]: [
                    {brand_name: {[Op.iLike]: `%${searchParam}%`}},
                    {model: {[Op.iLike]: `%${searchParam}%`}}
                ]
            }, include: "img"
        });

        return sneakersMapper.toManyResponse(sneakers);
    }
}
