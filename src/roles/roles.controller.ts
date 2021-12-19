import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { RolesService } from './roles.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './role.model';
import { RoleCreateDto } from './dto/role.create.dto';
import { Roles } from "./roles.metadata";
import { RolesGuard } from "./roles.guard";

@ApiTags('Roles')
@Controller('api/roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Used to create roles.' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() roleDto: RoleCreateDto) {
    return this.rolesService.createRole(roleDto);
  }

  @ApiOperation({ summary: 'Used to get roles.' })
  @ApiResponse({ status: 200, type: [Role] })
  @Roles('GOD')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.rolesService.getAllRoles();
  }

  @ApiOperation({ summary: 'Used to get role by name.' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:name')
  getRoleByName(@Param('name') name: string) {
    return this.rolesService.getRoleByName(name);
  }
}
