import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";

import { SneakersService } from "./sneakers.service";
import { CreateDto } from "./dto/create.dto";
import { ISneakers, ISneakersResponse } from "./interfaces/sneakers.interface";
import { IParams } from "./interfaces/params.interface";
import { UpdateDto } from "./dto/update.dto";
import { Roles } from "../core/guards/rolesAuth.decorator";
import { constant } from "../core/constants/constant";
import { RoleGuard } from "../core/guards/role.guard";

@Controller("sneakers")
export class SneakersController {
    constructor(private sneakersService: SneakersService) {}

    @Roles(constant.ADMIN)
    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard("jwt"))
    @Post()
    @UseInterceptors(FileInterceptor("img"))
    async create(@Body() sneakers: CreateDto, @UploadedFile() img): Promise<ISneakers> {
        return await this.sneakersService.create(sneakers, img);
    }

    @Get()
    async getAll(@Query() params: IParams): Promise<ISneakersResponse> {
        return await this.sneakersService.getAll(params);
    }

    @Get("/:id")
    async getById(@Param("id") id: number): Promise<ISneakers> {
        return await this.sneakersService.getById(id);
    }

    @Roles(constant.ADMIN)
    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard("jwt"))
    @Put("/:id")
    async updateById(@Param("id") id: number, @Body() dto: UpdateDto): Promise<[number]> {
        return await this.sneakersService.updateById(id, dto);
    }

    @Roles(constant.ADMIN)
    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard("jwt"))
    @Delete("/:id")
    async deleteById(@Param("id") id: number):Promise<number> {
        return await this.sneakersService.deleteById(id);
    }

    @Get("/search")
    async getAllBySearching(): Promise<ISneakers[]> {
        return await this.sneakersService.getAllBySearching();
    }
}
