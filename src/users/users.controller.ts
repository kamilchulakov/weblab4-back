import {
  Body,
  Controller,
  Get,
  Injectable,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user.create.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RoleAddDto } from "./dto/role.add.dto";
import { Roles } from "../roles/roles.metadata";
import { RolesGuard } from "../roles/roles.guard";

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
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Used to get current user.' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getMe(@Request() req) {
    return this.userService.getUserByLogin(req.user.login);
  }

  @ApiOperation({ summary: 'Used to add roles' })
  @ApiResponse({ status: 200, type: User })
  @Roles('GOD')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() addRoleDto: RoleAddDto) {
    return this.userService.addRole(addRoleDto);
  }
}
