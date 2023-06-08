import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { User } from "../users/users.model";

interface TokensCreationAttrs {
    access_token: string;
    refresh_token: string;
}

@Table({tableName: "tokens"})
export class Tokens extends Model<Tokens, TokensCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    access_token: string;

    @Column({type: DataType.STRING, allowNull: false})
    refresh_token: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User;
}