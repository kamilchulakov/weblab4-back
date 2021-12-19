import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface UserCreate {
  login: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreate> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  login: string;
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  password: string;
}
