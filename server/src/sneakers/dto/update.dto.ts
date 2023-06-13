import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class UpdateDto {
    @Min(0)
    @IsNumber()
    @IsNotEmpty()
    price: number;
}