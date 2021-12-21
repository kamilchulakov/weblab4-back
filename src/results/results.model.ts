import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';

interface ResultCreate {
  x: number;
  y: number;
  r: number;
}

@Table({ tableName: 'results4' })
export class Result extends Model<Result, ResultCreate> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: '1', description: 'X param as num' })
  @Column({
    type: DataType.DOUBLE,
    unique: false,
    allowNull: false,
  })
  x: number;
  @ApiProperty({ example: '1', description: 'Y param as num' })
  @Column({
    type: DataType.DOUBLE,
    unique: false,
    allowNull: false,
  })
  y: number;
  @ApiProperty({ example: '1', description: 'R param as num' })
  @Column({
    type: DataType.DOUBLE,
    unique: false,
    allowNull: false,
  })
  r: number;
  @ApiProperty({
    example: 'true',
    description: 'It means if point is inside figure',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  inside: boolean;
  // redundant due to nice table :| when: string;
  @ApiProperty({ example: '1', description: 'Execution time in milliseconds' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  executionMs: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
