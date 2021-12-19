import { ApiProperty } from '@nestjs/swagger';

export class RoleAddDto {
  @ApiProperty({ example: 'user', description: 'User login' })
  readonly login: string;
  @ApiProperty({ example: 'DOG', description: 'Role name' })
  readonly role: string;
}
