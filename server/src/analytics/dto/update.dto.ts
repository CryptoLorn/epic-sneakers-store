import { IsNumber, IsOptional } from "class-validator";

export class UpdateDto {
    @IsNumber()
    @IsOptional()
    views: number;

    @IsNumber()
    @IsOptional()
    bought: number;
}