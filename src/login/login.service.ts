import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { LoginDataDto } from './dto/loginData.dto';
import { PrismaService } from '../prisma.service';
import { compare } from 'bcrypt';
import { EmailService } from 'src/email/email.service';
@Injectable()
export class LoginService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}
  async findOne(loginData: LoginDataDto, res: Response) {
    const { email, password } = loginData;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return new HttpException('EMAIL_OR_PASSWORD_INVALID', 403);
    }
    const checkPassword = await compare(password, user.password as string);
    if (!checkPassword) {
      return new HttpException('EMAIL_OR_PASSWORD_INVALID', 403);
    }
    const code = Math.floor(100000 + Math.random() * 900000);

    await this.emailService.sendEmail(
      user.email,
      'Código de Verificación',
      code.toString(),
    );
    const idToken = await this.emailService.PushCode(
      { userId: user.id, code: code.toString() },
      user.email,
    );
    const response = res.status(HttpStatus.OK).json({
      message: 'Código enviado correctamente',
      verificationId: idToken,
    });

    return response;
  }
}
