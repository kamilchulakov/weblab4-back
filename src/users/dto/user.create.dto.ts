import { ApiProperty } from "@nestjs/swagger";

export class UserCreateDto {
  @ApiProperty({ example: 'user', description: 'Unique user login' })
  readonly login: string;
  @ApiProperty({ example: 'changeme', description: 'User password' })
  readonly password: string;
}
