import { IsEmail, IsEnum, IsString, IsOptional } from "class-validator";

import { roleEnum } from "../enums/role.enum";
import { statusEnum } from "../enums/status.enum";

export class UpdateDto {
    @IsString({message: "Email must be string"})
    @IsEmail({}, {message: "Invalid email"})
    @IsOptional()
    email: string;

    @IsString({message: "Role must be string"})
    @IsEnum(roleEnum, {message: "Role must be ADMIN or USER"})
    @IsOptional()
    role: string;

    @IsString({message: "Status must be string"})
    @IsEnum(statusEnum, {message: "Status must be ACTIVATED or UNACTIVATED"})
    @IsOptional()
    status: string;
}