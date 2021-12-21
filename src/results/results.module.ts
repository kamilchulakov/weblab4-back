import { forwardRef, Module } from '@nestjs/common';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';
import { AuthModule } from '../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Result } from './results.model';
import { User } from '../users/users.model';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [ResultsController],
  providers: [ResultsService],
  imports: [
    forwardRef(() => AuthModule),
    UsersModule,
    SequelizeModule.forFeature([Result, User]),
  ],
})
export class ResultsModule {}
