import { ISneakers } from "../interfaces/sneakers.interface";

export class SneakersMapper {
    public toResponse(sneakers: ISneakers) {
        return {
            id: sneakers.id,
            model: sneakers.model,
            brand_name: sneakers.brand_name,
            price: sneakers.price,
            color: sneakers.color,
            material: sneakers.material,
            // If one image
            // img: `${process.env.AWS_S3_URL}/${sneakers.img}`,
            img: sneakers.img,
            description: sneakers.description,
            brandId: sneakers.brandId,
            typeId: sneakers.typeId
        }
    }

    public toManyResponse(sneakers: ISneakers[]) {
        return sneakers.map(this.toResponse);
    }
}

export const sneakersMapper = new SneakersMapper();