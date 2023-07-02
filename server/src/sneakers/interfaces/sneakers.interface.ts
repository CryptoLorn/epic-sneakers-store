import { IImage } from "../../imgs/interfaces/img.interface";

export interface ISneakers {
    id: number;
    model: string;
    brand_name?: string;
    price: number;
    color?: string;
    material?: string;
    img: IImage[];
    description?: string;
    brandId: number;
    typeId: number;
}

export interface ISneakersResponse {
    count: number;
    rows: ISneakers[];
}