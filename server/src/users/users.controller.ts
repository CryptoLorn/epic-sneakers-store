import { Controller, Get, Param, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";

import { UsersService } from "./users.service";
import { IUser } from "../core/interfaces/user.interface";
import { RoleGuard } from "../core/guards/role.guard";
import { Roles } from "../core/guards/rolesAuth.decorator";
import { constant } from "../core/constants/constant";

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
}
