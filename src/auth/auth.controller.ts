import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from '../users/dto/user.create.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Used to login. Returns JWT.' })
  @ApiResponse({ status: 200, type: String })
  @Post('/login')
  login(@Body() userDto: UserCreateDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Used to register. Returns JWT.' })
  @ApiResponse({ status: 200, type: String })
  @Post('/register')
  register(@Body() userDto: UserCreateDto) {
    return this.authService.register(userDto);
  }
}
