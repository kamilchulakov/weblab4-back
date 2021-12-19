import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { UserCreateDto } from './dto/user.create.dto';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/role.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: UserCreateDto) {
    try {
      const user = await this.userRepository.create(dto);
      const role = await this.rolesService.getRoleByName('USER');
      await user.$set('roles', [role.id]);
      user.roles = [role];
      return user;
    } catch (e) {
      throw new HttpException('Login already in use!', HttpStatus.BAD_REQUEST);
    }
  }
  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: Role });
    // { all: true } is also fine
    return users;
  }
  async getUserByLogin(login: string) {
    const user = await this.userRepository.findOne({
      where: { login },
      include: Role,
    });
    return user;
  }
}
