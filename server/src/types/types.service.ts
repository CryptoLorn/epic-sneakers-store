import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Types } from "./types.model";
import { CreateDto } from "./dto/create.dto";
import { IType } from "./interfaces/type.interface";

@Injectable()
export class TypesService {
    constructor(@InjectModel(Types)
    private typeRepository: typeof Types) {}

    async create(type: CreateDto): Promise<IType> {
        const isType = await this.findOneByName(type.name);

        if (isType) {
            throw new HttpException("Type is already exists", HttpStatus.BAD_REQUEST);
        }

        return await this.typeRepository.create(type);
    }

    async getAll():Promise<IType[]> {
        return await this.typeRepository.findAll();
    }

    async findOneByName(name: string): Promise<IType> {
        return await this.typeRepository.findOne({where: {name}});
    }
}
