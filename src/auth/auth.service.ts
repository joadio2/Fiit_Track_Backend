import { Injectable, HttpStatus, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async verifyCode(
    id: string,
    code: string,
    userAgent: string,
    ip: string,
    res: Response,
  ) {
    const isCodeValid = await this.prisma.verificationCode.findFirst({
      where: { id, code },
    });

    const currentDate = new Date();

    if (!isCodeValid) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Código inválido',
      });
    }

    if (isCodeValid.expiresAt < currentDate) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Código expirado',
        expiredAt: isCodeValid.expiresAt,
      });
    }

    await this.prisma.verificationCode.delete({
      where: { id: isCodeValid.id },
    });

    const getUser = await this.prisma.user.findUnique({
      where: { id: isCodeValid.userId },
      select: {
        id: true,
        email: true,
        name: true,
        familyName: true,
        locale: true,
      },
    });

    if (!getUser) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Usuario no encontrado',
      });
    }

    const payload = { userId: getUser.id, email: getUser.email };
    const token = this.jwtService.sign(payload, {
      expiresIn: '10m',
    });

    const createToken = await this.prisma.userToken.create({
      data: {
        token,
        userId: getUser.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 10),
        ip,
        userAgent,
      },
    });

    if (!createToken) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'No se pudo guardar el token',
      });
    }

    return res.status(HttpStatus.OK).json({
      message: 'Código de verificación validado',
      verificationId: isCodeValid.id,
      token: token,
    });
  }

  async verifyToken(
    token: string,
    res: Response,
    userAgent: string,
    ip: string,
  ) {
    try {
      await this.jwtService.verify(token);
      const checkToken = await this.prisma.userToken.findFirst({
        where: {
          token: token,
        },
      });
      if (!checkToken) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Token Invalid',
        });
      }
      if (checkToken.userAgent !== userAgent) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Token Invalid',
        });
      }

      const userInfo = await this.prisma.user.findUnique({
        where: {
          id: checkToken.userId,
        },
        select: {
          id: true,
          email: true,
          name: true,
          familyName: true,
        },
      });
      return res.status(HttpStatus.OK).json({
        message: 'Token Valid',
        userInfo,
      });
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Token Expired',
          error: e.message,
        });
      }

      if (e.name === 'JsonWebTokenError') {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Invalid Token',
          error: e.message,
        });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al verificar el token',
        error: e.message,
      });
    }
  }
}
