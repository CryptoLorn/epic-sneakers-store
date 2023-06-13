import { IsNumber } from "class-validator";

export class UpdateDto {
    @IsNumber()
    views: number;

    @IsNumber()
    bought: number;
}