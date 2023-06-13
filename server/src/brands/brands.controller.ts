import { Body, Controller, Get, Post } from "@nestjs/common";

import { BrandsService } from "./brands.service";
import { IBrand } from "./interfaces/brand.interface";
import { CreateDto } from "./dto/create.dto";

@Controller("brands")
export class BrandsController {
    constructor(private brandService: BrandsService) {}

    @Post()
    async create(@Body() brand: CreateDto): Promise<IBrand> {
        return await this.brandService.create(brand);
    }

    @Get()
    async getAll(): Promise<IBrand[]> {
        return await this.brandService.getAll();
    }
}
