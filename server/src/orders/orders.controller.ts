import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { OrdersService } from "./orders.service";
import { CreateDto } from "./dto/create.dto";
import { IOrders } from "./interfaces/orders.interface";

@Controller("orders")
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @UseGuards(AuthGuard("jwt"))
    @Post()
    async create(@Body() ordersDto: CreateDto) {
        return await this.ordersService.create(ordersDto);
    }

    @Get()
    async getAll(@Query("basketId") basketId: number): Promise<IOrders[]> {
        return await this.ordersService.getAll(basketId);
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete("/:id")
    async deleteById(@Param("id") id: number): Promise<number> {
        return await this.ordersService.deleteById(id);
    }
}
