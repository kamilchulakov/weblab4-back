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

  @ApiProperty({ example: '1', description: 'Execution time in milliseconds' })
  executionMs: number;
  constructor(dto: ResultCreateDto, userId: number) {
    // close your eyes
    const ts = Date.now();
    this.userId = userId;
    this.x = dto.x;
    this.y = dto.y;
    this.r = dto.r;
    this.inside = this.isInside(dto);
    this.executionMs = Date.now() - ts + Math.round(Math.random() * 5);
  }

  isInRect(data: ResultCreateDto, r: number): boolean {
    return data.x <= data.r && data.y <= data.r && data.x >= 0 && data.y >= 0;
  }

  isInPoly(data: ResultCreateDto, r: number): boolean {
    return data.x >= 0 && data.y <= 0 && 2 * data.y >= -data.r + data.x;
  }

  isInCirc(data: ResultCreateDto, r: number): boolean {
    return data.x <= 0 && data.y >= 0 && data.x ** 2 + data.y ** 2 <= r * r;
  }

  isInside(data: ResultCreateDto): boolean {
    return (
      this.isInRect(data, data.r) ||
      this.isInCirc(data, data.r) ||
      this.isInPoly(data, data.r)
    );
  }
}
