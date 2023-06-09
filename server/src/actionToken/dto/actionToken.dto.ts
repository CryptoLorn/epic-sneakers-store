import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ActionTokenDto {
    @IsString()
    @IsNotEmpty()
    readonly token: string;

    @IsString()
    @IsNotEmpty()
    readonly token_type: string;

    @IsNumber()
    @IsNotEmpty()
    readonly userId: number;
}