import { Body, Controller, Post } from "@nestjs/common";

import { UsersService } from "./users.service";
import { AuthDto } from "../auth/dto/auth.dto";
import { IUser } from "../core/interfaces/user.interface";

@Controller("users")
export class UsersController {
    constructor(private userService: UsersService) {}
    
    @Post()
    async create(@Body() userDto: AuthDto): Promise<IUser> {
        return await this.userService.create(userDto);
    }
}
