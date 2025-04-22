import { Controller, Get, Query, Res, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private prisma: PrismaService,
  ) {}

  @Get('verify-code')
  async verifyCode(
    @Query('id') id: string,
    @Query('code') code: string,
    @Res() res: Response,
    @Headers('X-User-Agent') userAgent: string,
    @Headers('X-IP-Address') ip: string,
  ) {
    try {
      console.log('id', id);
      const isCodeValid = await this.authService.verifyCode(
        id,
        code,
        userAgent,
        ip,
        res,
      );

      return isCodeValid;
    } catch (error) {
      return res.status(500).json({
        message: 'Error al verificar el código',
        error: error.message,
      });
    }
  }

  @Get('verify-token')
  async verifyToken(
    @Res() res: Response,
    @Headers('Authorization') token: string,
    @Headers('X-User-Agent') userAgent: string,
    @Headers('X-IP-Address') ip: string,
  ) {
    return await this.authService.verifyToken(token, res, userAgent, ip);
  }
}
