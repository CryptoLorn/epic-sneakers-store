import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Req,
    Res,
    UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";

import { UsersService } from "./users.service";
import { IUser } from "./interfaces/user.interface";
import { RoleGuard } from "../core/guards/role.guard";
import { Roles } from "../core/guards/rolesAuth.decorator";
import { constant } from "../core/constants/constant";
import { UpdateDto } from "./dto/update.dto";

@Controller("users")
export class UsersController {
    constructor(private userService: UsersService) {}
    
    @Get("/activate/:link")
    async activation(@Param("link") link: string, @Res() res: Response): Promise<void> {
        await this.userService.activate(link);

        return res.redirect(process.env.CLIENT_URL);
    }

    @Roles(constant.ADMIN)
    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard("jwt"))
    @Get("/:id")
    async getAll(@Param("id") id: number): Promise<IUser[]> {
        return await this.userService.getAll(id);
    }

    @Roles(constant.ADMIN)
    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard("jwt"))
    @Put("/:id")
    async updateById(@Param("id") id: number, @Body() user: UpdateDto): Promise<[number]> {
        return await this.userService.updateById(id, user);
    }

    @Post("/password/forgot")
    async forgotPassword(@Body("email") email: string): Promise<string> {
        return await this.userService.forgotPassword(email);
    }

    @Put("/password/forgot")
    async setNewPassword(@Body("password") password: string, @Req() req: Request): Promise<string> {
        const token = req.get(constant.AUTHORIZATION);

        if (!token) {
            throw new NotFoundException({message: "No token"});
        }

        return await this.userService.setNewPassword(token, password);
    }

    @Roles(constant.ADMIN)
    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard("jwt"))
    @Delete("/:id")
    async deleteById(@Param("id") id: number): Promise<number> {
        return this.userService.deleteById(id);
    }
}
