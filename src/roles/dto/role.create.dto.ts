import { ApiProperty } from '@nestjs/swagger';

export class RoleCreateDto {
  @ApiProperty({ example: 'DOG', description: 'Role name' })
  readonly name: string;
  @ApiProperty({ example: 'It bites', description: 'ROle description' })
  readonly description: string;
}
