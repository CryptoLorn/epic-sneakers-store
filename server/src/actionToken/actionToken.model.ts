import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { User } from "../users/users.model";

interface ActionTokensCreationAttrs {
    token: string;
    token_type: string;
    userId: number;
}

@Table({tableName: "action_token"})
export class ActionToken extends Model<ActionToken, ActionTokensCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    token: string;

    @Column({type: DataType.STRING})
    token_type: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User;
}