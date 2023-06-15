import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";

import { Baskets } from "../baskets/baskets.model";
import { Tokens } from "../tokens/tokens.model";
import { roleEnum } from "./enums/role.enum";
import { statusEnum } from "./enums/status.enum";
import { constant } from "../core/constants/constant";

interface UserCreationAttrs {
    email: string;
    password: string;
    role: string;
    activation_link: string;
}

@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.ENUM({values: roleEnum}), defaultValue: constant.USER})
    role: string;

    @Column({type: DataType.ENUM({values: statusEnum}), defaultValue: "ACTIVATED"})
    status: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    is_activated: boolean;

    @Column({type: DataType.STRING})
    activation_link: string;

    @HasOne(() => Tokens)
    tokens: Tokens;

    @HasOne(() => Baskets)
    basket: Baskets;
}