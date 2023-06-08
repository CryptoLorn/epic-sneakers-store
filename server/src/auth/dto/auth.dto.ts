import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class AuthDto {
    @IsString({message: "Email must be string"})
    @IsEmail({}, {message: "Invalid email"})
    @IsNotEmpty()
    readonly email: string;

    @IsString({message: "Password must be string"})
    @Length(4, 16, {message: "Password must be from 4-16 characters"})
    @IsNotEmpty()
    readonly password: string;
}