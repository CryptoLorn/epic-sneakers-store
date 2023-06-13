import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

import { Brands } from "../brands/brands.model";
import { BrandsTypes } from "../brands/brandsTypes.model";
import { Sneakers } from "../sneakers/sneakers.model";

@Table({tableName: "types"})
export class Types extends Model<Types> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @BelongsToMany(() => Brands, () => BrandsTypes)
    brands: Brands[];

    @HasMany(() => Sneakers)
    sneakers: Sneakers[];
}