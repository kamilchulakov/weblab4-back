import { ResultCreateDto } from './result.create.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType } from 'sequelize-typescript';

export class ResultProgressedDto {
  @ApiProperty({ example: '1', description: 'X param as num' })
  x: number;
  @ApiProperty({ example: '1', description: 'Y param as num' })
  y: number;
  @ApiProperty({ example: '1', description: 'R param as num' })
  r: number;
  @ApiProperty({ example: '1', description: 'User id' })
  userId: number;
  @ApiProperty({
    example: 'true',
    description: 'It means if point is inside figure',
  })
  inside: boolean;
  constructor(dto: ResultCreateDto, userId: number) {
    // close your eyes

    this.userId = userId;
    this.x = dto.x;
    this.y = dto.y;
    this.r = dto.r;
  }
}
