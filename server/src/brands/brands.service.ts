import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Brands } from "./brands.model";
import { IBrand } from "./interfaces/brand.interface";
import { CreateDto } from "./dto/create.dto";

@Injectable()
export class BrandsService {
    constructor(@InjectModel(Brands)
                private brandRepository: typeof Brands) {
    }

    async create(brand: CreateDto): Promise<IBrand> {
        const isBrand = await this.findOneByName(brand.name);

        if (isBrand) {
            throw new HttpException("Brand is already exists", HttpStatus.BAD_REQUEST);
        }

        return await this.brandRepository.create(brand);
    }

    async getAll(): Promise<IBrand[]> {
        return await this.brandRepository.findAll();
    }

    async findOneByName(name: string): Promise<IBrand> {
        return await this.brandRepository.findOne({where: {name}});
    }
}
