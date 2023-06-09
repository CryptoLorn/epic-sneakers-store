import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

import { Types } from "../types/types.model";
import { BrandsTypes } from "./brandsTypes.model";
import { Sneakers } from "../sneakers/sneakers.model";

@Table({tableName: "brands"})
export class Brands extends Model<Brands> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @BelongsToMany(() => Types, () => BrandsTypes)
    types: Types[];

    @HasMany(() => Sneakers)
    sneakers: Sneakers[];
}