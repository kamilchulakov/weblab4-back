// What client sends
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType } from "sequelize-typescript";

export class ResultCreateDto {
  @ApiProperty({ example: '1', description: 'X param as num' })
  readonly x: number;
  @ApiProperty({ example: '1', description: 'Y param as num' })
  readonly y: number;
  @ApiProperty({ example: '1', description: 'R param as num' })
  readonly r: number;
  @ApiProperty({ example: '1', description: 'User id' })
  userId: number;
}
