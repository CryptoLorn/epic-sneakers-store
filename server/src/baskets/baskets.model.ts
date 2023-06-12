import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { User } from "../users/users.model";

interface BasketsCreationAttrs {
    userId: number;
}

@Table({tableName: "baskets"})
export class Baskets extends Model<Baskets, BasketsCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User;
}