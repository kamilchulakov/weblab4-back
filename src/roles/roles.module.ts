import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './role.model';
import { User } from '../users/users.model';
import { UserRoles } from '../users-roles/user-roles.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles]),
    JwtModule.register({
      secret: process.env.SECRET || 'secret',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [RolesService],
})
export class RolesModule {}
