import { Column, DataType, Model, Table } from "sequelize-typescript";


@Table({tableName: "analytics"})
export class Analytics extends Model<Analytics> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, defaultValue: 0})
    views: number;

    @Column({type: DataType.INTEGER, defaultValue: 0})
    bought: number;
}