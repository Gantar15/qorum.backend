import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AccountRegister } from '@qorum.backend/contracts';
import { RMQService } from 'nestjs-rmq';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { AuthService } from '../services/auth.service';
import { IUserMixin } from '@qorum.backend/interfaces';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly rmqService: RMQService,
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.rmqService.send<
      AccountRegister.Request,
      AccountRegister.Response
    >(AccountRegister.topic, dto);
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginDto
  ) {
    return this.authService.login(res, dto);
  }

  @Post('logout')
  async logout(
    @Req() req: Request & IUserMixin,
    @Res({ passthrough: true }) res: Response
  ) {
    const userId = req.user.id;
    return this.authService.logout(res, userId);
  }
}
