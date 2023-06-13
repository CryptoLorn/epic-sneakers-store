import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Orders } from "./orders.model";
import { IOrders } from "./interfaces/orders.interface";
import { CreateDto } from "./dto/create.dto";

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Orders)
                private ordersRepository: typeof Orders) {}

    async create(orders: CreateDto): Promise<IOrders> {
        return await this.ordersRepository.create(orders);
    }

    async getAll(basketId: number): Promise<IOrders[]> {
        if (basketId) {
            return await this.ordersRepository.findAll({where: {basketId}});
        }
    }

    async deleteById(id: number): Promise<number> {
        return this.ordersRepository.destroy({where: {id}});
    }

    async deleteAllByBasketId(basketId: number): Promise<number> {
        return this.ordersRepository.destroy({where: {basketId}, force: true});
    }

    async deleteAllBySneakersId(sneakerId: number): Promise<number> {
        return this.ordersRepository.destroy({where: {sneakerId}, force: true});
    }
}
