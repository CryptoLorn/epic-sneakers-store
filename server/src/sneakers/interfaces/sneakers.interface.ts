export interface ISneakers {
    id: number;
    model: string;
    brand_name?: string;
    price: number;
    color?: string;
    material?: string;
    img: string;
    description?: string;
}

export interface ISneakersResponse {
    count: number;
    rows: ISneakers[];
}