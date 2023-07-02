import {
    Body,
    Controller,
    Delete,
    // FileTypeValidator,
    Get,
    // MaxFileSizeValidator,
    Param,
    // ParseFilePipe,
    Post,
    Put,
    Query,
    // UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
    // FileInterceptor,
    FilesInterceptor
} from "@nestjs/platform-express";

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
    // If one image
    // @UseInterceptors(FileInterceptor("img"))
    @UseInterceptors(FilesInterceptor("img", 5))
    async create(
        @Body() sneakers: CreateDto,
        // If one image
        // @UploadedFile(new ParseFilePipe({
        //             validators: [
        //                 new MaxFileSizeValidator({maxSize: 1000000}),
        //                 new FileTypeValidator({fileType: "image/jpeg|image/jpg|image/png|image/webp"})
        //             ]
        //         })) img: Express.Multer.File
        @UploadedFiles() img: Express.Multer.File[]
    ): Promise<ISneakers> {
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
    async deleteById(@Param("id") id: number): Promise<number> {
        return await this.sneakersService.deleteById(id);
    }

    @Get("/search/params")
    async getAllBySearching(@Query("param") searchParam: string): Promise<ISneakers[]> {
        return await this.sneakersService.getAllBySearching(searchParam);
    }
}
