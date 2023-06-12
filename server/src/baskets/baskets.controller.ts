import { Controller, Get, Param } from "@nestjs/common";

import { BasketsService } from "./baskets.service";
import { IBasket } from "../core/interfaces/basket.interface";

@Controller("baskets")
export class BasketsController {
    constructor(private basketService: BasketsService) {}

    @Get("/:id")
    async getById(@Param("id") id: number): Promise<IBasket> {
        return await this.basketService.getById(id);
    }
}
