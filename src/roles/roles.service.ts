import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './role.model';
import { RoleCreateDto } from './dto/role.create.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  async createRole(dto: RoleCreateDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }
  async getAllRoles() {
    const roles = await this.roleRepository.findAll();
    return roles;
  }
  async getRoleByName(name: string) {
    const role = await this.roleRepository.findOne({ where: { name } });
    return role;
  }
}
