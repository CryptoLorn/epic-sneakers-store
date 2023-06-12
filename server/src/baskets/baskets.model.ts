import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";

import { User } from "../users/users.model";
import { Orders } from "../orders/orders.model";

@Table({tableName: "baskets"})
export class Baskets extends Model<Baskets> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Orders)
    orders: Orders[];
}