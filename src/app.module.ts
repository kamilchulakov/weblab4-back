import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/role.model';
import { UserRoles } from './users-roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { ResultsModule } from './results/results.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { Result } from './results/results.model';
import { AfModule } from './af/af.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.PASSWORD,
      database: process.env.DB,
      models: [User, Role, UserRoles, Result],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    ResultsModule,
    AfModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('api');
  }
}
