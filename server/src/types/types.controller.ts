import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { TypesService } from "./types.service";
import { CreateDto } from "./dto/create.dto";
import { IType } from "./interfaces/type.interface";
import { Roles } from "../core/guards/rolesAuth.decorator";
import { constant } from "../core/constants/constant";
import { RoleGuard } from "../core/guards/role.guard";

@Controller("types")
export class TypesController {
    constructor(private typeService: TypesService) {}

    @Roles(constant.ADMIN)
    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard("jwt"))
    @Post()
    async create(@Body() type: CreateDto): Promise<IType> {
        return await this.typeService.create(type);
    }

    @Get()
    async getAll(): Promise<IType[]> {
        return await this.typeService.getAll();
    }
}
