import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { Sneakers } from "../sneakers/sneakers.model";

@Table({tableName: "analytics"})
export class Analytics extends Model<Analytics> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, defaultValue: 0})
    views: number;

    @Column({type: DataType.INTEGER, defaultValue: 0})
    bought: number;

    @ForeignKey(() => Sneakers)
    @Column({type: DataType.INTEGER})
    sneakersId: number;

    @BelongsTo(() => Sneakers)
    sneakers: Sneakers;
}