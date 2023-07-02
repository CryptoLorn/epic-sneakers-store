import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";

import { Img } from "./img.model";
import { IImage } from "./interfaces/img.interface";

@Injectable()
export class ImgsService {
    constructor(@InjectModel(Img)
                private readonly imgRepository: typeof Img) {
    }

    async create(filePath: string, sneakerId: number): Promise<IImage> {
        return await this.imgRepository.create({path: filePath, sneakerId});
    }

    async deleteById(id: number): Promise<number> {
        return await this.imgRepository.destroy({where: {sneakerId: id}});
    }
}
