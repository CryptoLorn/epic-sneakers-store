import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateDto {
    @IsString({message: "Model must be string"})
    @IsNotEmpty({message: "Model can not be empty"})
    model: string;

    @IsString({message: "Role must be string"})
    @IsNotEmpty({message: "Brand can not be empty"})
    brand_name: string;

    @IsNumber()
    @IsNotEmpty({message: "Price can not be empty"})
    price: number;

    @IsString({message: "Img must be string"})
    @IsNotEmpty({message: "Img can not be empty"})
    img: string;

    @IsNumber()
    @IsNotEmpty({message: "Size can not be empty"})
    size: number;

    @IsNumber()
    @IsNotEmpty()
    basketId: number;

    // @IsNumber()
    // @IsNotEmpty()
    // sneakerId: number;
}