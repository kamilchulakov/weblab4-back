import { Body, Controller, Get, Injectable, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user.create.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Used to create users.' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: UserCreateDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Used to get users.' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
}
