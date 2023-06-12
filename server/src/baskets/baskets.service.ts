import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Baskets } from "./baskets.model";
import { IBasket } from "../core/interfaces/basket.interface";

@Injectable()
export class BasketsService {
    constructor(@InjectModel(Baskets)
                private basketRepository: typeof Baskets) {}

    async create(userId: number): Promise<IBasket> {
        return await this.basketRepository.create({userId});
    }

    async getById(id: number): Promise<IBasket> {
        return await this.basketRepository.findOne({where: {id}});
    }

    async deleteById(id: number): Promise<number> {
        // await ordersService.deleteAllByBasketId(id);

        return await this.basketRepository.destroy({where: {id}});
    }
}
