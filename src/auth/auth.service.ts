import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UserCreateDto } from '../users/dto/user.create.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: UserCreateDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }
  async register(userDto: UserCreateDto) {
    if (await this.usersService.getUserByLogin(userDto.login)) {
      throw new HttpException(
        `Login ${userDto.login} is already used!`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPass = await bcrypt.hash(
      userDto.password,
      Number(process.env.SALT) || 5,
    );
    const user = await this.usersService.createUser({
      login: userDto.login,
      password: hashedPass,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, login: user.login, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(user: UserCreateDto) {
    if (!user)
      throw new HttpException('No user provided!', HttpStatus.BAD_REQUEST);
    const usr = await this.usersService.getUserByLogin(user.login);
    if (usr) {
      const passNotEquals = await bcrypt.compare(user.password, usr.password);
      if (!passNotEquals) {
        throw new UnauthorizedException({ message: 'Invalid password' });
      }
      return usr;
    } else new UnauthorizedException({ message: 'Invalid login' });
  }
}
