import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { Baskets } from "../baskets/baskets.model";
import { Sneakers } from "../sneakers/sneakers.model";

@Table({tableName: "orders"})
export class Orders extends Model<Orders> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    model: string;

    @Column({type: DataType.STRING, allowNull: false})
    brand_name: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    price: number;

    @Column({type: DataType.STRING, allowNull: false})
    img: string;

    @Column({type: DataType.DOUBLE, allowNull: false})
    size: number;

    @ForeignKey(() => Baskets)
    @Column({type: DataType.INTEGER})
    basketId: number;

    @ForeignKey(() => Sneakers)
    @Column({type: DataType.INTEGER})
    sneakerId: number

    @BelongsTo(() => Baskets)
    basket: Baskets;

    @BelongsTo(() => Sneakers)
    sneakers: Sneakers;
}