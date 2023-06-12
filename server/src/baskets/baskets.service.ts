import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Baskets } from "./baskets.model";
import { IBasket } from "./interfaces/basket.interface";
import { OrdersService } from "../orders/orders.service";

@Injectable()
export class BasketsService {
    constructor(@InjectModel(Baskets)
                private basketRepository: typeof Baskets,
                private ordersService: OrdersService) {}

    async create(userId: number): Promise<IBasket> {
        return await this.basketRepository.create({userId});
    }

    async getById(id: number): Promise<IBasket> {
        return await this.basketRepository.findOne({where: {id}});
    }

    async deleteById(id: number): Promise<number> {
        await this.ordersService.deleteAllByBasketId(id);

        return await this.basketRepository.destroy({where: {id}});
    }
}
