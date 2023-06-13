import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { Brands } from "./brands.model";
import { Types } from "../types/types.model";

@Table({tableName: "brands_types", createdAt: false, updatedAt: false})
export class BrandsTypes extends Model<BrandsTypes> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Brands)
    @Column({type: DataType.INTEGER})
    brandId: number;

    @ForeignKey(() => Types)
    @Column({type: DataType.INTEGER})
    typeId: number;
}