import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({ example: 'user', description: 'Unique user login' })
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, {
    message: 'Length of login must be more than 4 and less than 16',
  })
  readonly login: string;
  @Length(4, 30, { message: 'Length of login must be more than 4 and less than 30' })
  @ApiProperty({ example: 'changeme', description: 'User password' })
  readonly password: string;
}
