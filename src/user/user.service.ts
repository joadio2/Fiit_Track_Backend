import { Res, Injectable, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from './dto/user.dto';
import { PrismaService } from '../prisma.service';
import { EmailService } from 'src/email/email.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  getUsers() {
    return this.prisma.user.findMany();
  }

  async newUser(user: UserDto, res: Response) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await this.prisma.user.create({
        data: {
          name: user.name,
          familyName: user.lastName,
          email: user.email,
          password: hashedPassword,
        },
      });
      const code = Math.floor(100000 + Math.random() * 900000);

      await this.emailService.PushCode(
        {
          userId: newUser.id,
          code: code.toString(),
        },
        newUser.email,
      );

      await this.emailService.sendEmail(
        newUser.email,
        'Código de Verificación',
        code.toString(),
      );
      return res.status(HttpStatus.CREATED).json({
        message: 'Usuario creado correctamente',
        user: newUser,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'No se pudo crear el usuario',
        error: error.message,
      });
    }
  }
}
