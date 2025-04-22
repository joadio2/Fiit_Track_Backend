import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaService } from '../prisma.service';
import { JWT_SECRET } from './jwt.constants';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, PrismaService, EmailService],
})
export class LoginModule {}
