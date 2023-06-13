import { Body, Controller, Get, Post } from "@nestjs/common";

import { TypesService } from "./types.service";
import { CreateDto } from "./dto/create.dto";
import { IType } from "./interfaces/type.interface";

@Controller("types")
export class TypesController {
    constructor(private typeService: TypesService) {}

    @Post()
    async create(@Body() type: CreateDto): Promise<IType> {
        return await this.typeService.create(type);
    }

    @Get()
    async getAll(): Promise<IType[]> {
        return await this.typeService.getAll();
    }
}
