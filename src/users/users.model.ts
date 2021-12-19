import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import { Role } from "../roles/role.model";
import { UserRoles } from "../users-roles/user-roles.model";

export interface UserCreate {
  login: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreate> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'user', description: 'Unique user login' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  login: string;
  @ApiProperty({ example: 'changeme', description: 'User password' })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  password: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
