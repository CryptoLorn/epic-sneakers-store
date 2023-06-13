import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { BrandsService } from "./brands.service";
import { IBrand } from "./interfaces/brand.interface";
import { CreateDto } from "./dto/create.dto";
import { Roles } from "../core/guards/rolesAuth.decorator";
import { constant } from "../core/constants/constant";
import { RoleGuard } from "../core/guards/role.guard";

@Controller("brands")
export class BrandsController {
    constructor(private brandService: BrandsService) {}

    @Roles(constant.ADMIN)
    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard("jwt"))
    @Post()
    async create(@Body() brand: CreateDto): Promise<IBrand> {
        return await this.brandService.create(brand);
    }

    @Get()
    async getAll(): Promise<IBrand[]> {
        return await this.brandService.getAll();
    }
}
