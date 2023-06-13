import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    HasOne,
    Model,
    Table
} from "sequelize-typescript";

import { Brands } from "../brands/brands.model";
import { Types } from "../types/types.model";
import { Orders } from "../orders/orders.model";
import { Analytics } from "../analytics/analytics.model";

@Table({tableName: "sneakers"})
export class Sneakers extends Model<Sneakers> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    model: string;

    @Column({type: DataType.STRING, allowNull: false})
    brand_name: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    price: number;

    @Column({type: DataType.STRING})
    color: string;

    @Column({type: DataType.STRING})
    material: string;

    @Column({type: DataType.STRING, allowNull: false})
    img: string;

    @Column({type: DataType.STRING})
    description: string;

    @ForeignKey(() => Brands)
    @Column({type: DataType.INTEGER})
    brandId: number;

    @ForeignKey(() => Types)
    @Column({type: DataType.INTEGER})
    typeId: number;

    @BelongsTo(() => Brands)
    brand: Brands;

    @BelongsTo(() => Types)
    type: Types;

    @HasMany(() => Orders)
    orders: Orders[];

    @HasOne(() => Analytics)
    analytics: Analytics;
}