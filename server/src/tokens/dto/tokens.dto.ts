import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TokensDto {
    @IsNumber()
    @IsNotEmpty()
    readonly userId: number;

    @IsString()
    @IsNotEmpty()
    readonly access_token: string;

    @IsString()
    @IsNotEmpty()
    readonly refresh_token: string;
}