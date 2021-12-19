import {
  CanActivate,
  ExecutionContext, HttpException, HttpStatus,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.metadata';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true; // будет доступно всем
    }
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const [bearer, token] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException();
      }

      // декодирование юзера
      const user = this.jwtService.verify(token);
      req.user = user;
      return user.roles.some((role) => roles.includes(role.name)); // проверка есть ли роль
    } catch (e) {
      console.log(e);
      throw new HttpException('You have no rights.', HttpStatus.FORBIDDEN);
    }
  }
}
