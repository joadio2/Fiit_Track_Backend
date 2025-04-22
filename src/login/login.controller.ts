import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginService } from './login.service';
import { LoginDataDto } from './dto/loginData.dto';
import { EmailService } from 'src/email/email.service';
@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly emailService: EmailService,
  ) {}

  @Post('checkAuth')
  @UsePipes(ValidationPipe)
  findOne(@Body() loginData: LoginDataDto, @Res() res: Response) {
    return this.loginService.findOne(loginData, res);
  }
}
