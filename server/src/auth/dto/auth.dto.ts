import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

import { roleEnum } from "../../users/enums/role.enum";

export class AuthDto {
    @IsString({message: "Email must be string"})
    @IsEmail({}, {message: "Invalid email"})
    @IsNotEmpty()
    readonly email: string;

    @IsString({message: "Password must be string"})
    @Length(4, 16, {message: "Password must be from 4-16 characters"})
    @IsNotEmpty()
    readonly password: string;

    @IsString({message: "Role must be string"})
    @IsEnum(roleEnum, {message: "Role must be ADMIN or USER"})
    @IsOptional()
    role: string;
}