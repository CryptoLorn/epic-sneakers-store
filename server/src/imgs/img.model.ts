import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { Sneakers } from "../sneakers/sneakers.model";

@Table({tableName: "img"})
export class Img extends Model<Img> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    path: string;

    @ForeignKey(() => Sneakers)
    @Column({type: DataType.INTEGER})
    sneakerId: number;

    @BelongsTo(() => Sneakers)
    brand: Sneakers;
}