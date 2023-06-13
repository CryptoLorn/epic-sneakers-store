import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDto {
    @IsString()
    @IsNotEmpty()
    model: string;

    @IsString()
    @IsOptional()
    brand_name: string;

    @IsNotEmpty()
    price: number;

    @IsString()
    @IsOptional()
    color: string;

    @IsString()
    @IsOptional()
    material: string;

    @IsString()
    @IsOptional()
    description: string;
}