import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { OrdersService } from "./orders.service";
import { CreateDto } from "./dto/create.dto";
import { IOrders } from "./interfaces/orders.interface";
import { RoleGuard } from "../core/guards/role.guard";

@Controller("orders")
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard("jwt"))
    @Post()
    async create(@Body() orders: CreateDto): Promise<IOrders> {
        return await this.ordersService.create(orders);
    }

    @Get()
    async getAll(@Query("basketId") basketId: number): Promise<IOrders[]> {
        return await this.ordersService.getAll(basketId);
    }

    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard("jwt"))
    @Delete("/:id")
    async deleteById(@Param("id") id: number): Promise<number> {
        return await this.ordersService.deleteById(id);
    }
}
