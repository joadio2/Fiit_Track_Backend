import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'src/prisma.service';
import { CodeDto } from 'src/login/dto/codeDto.dto';
@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private prisma: PrismaService,
  ) {}

  async sendEmail(to: string, subject: string, code: string) {
    return await this.mailerService.sendMail({
      to,
      subject,
      html: `
      <!doctype html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Código de Verificación</title>
        </head>
        <body
          style="
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
          "
        >
          <table width="100%" cellpadding="0" cellspacing="0" style="padding: 20px">
            <tr>
              <td align="center">
                <table
                  width="100%"
                  style="
                    max-width: 600px;
                    background-color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
                    padding: 30px;
                  "
                >
                  <tr>
                    <td align="center" style="padding-bottom: 20px">
                      <h1 style="color: #333333; font-size: 24px">👋 ¡Hola!</h1>
                      <p style="color: #555555; font-size: 16px; margin: 0">
                        Tu código de verificación es:
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding: 20px 0">
                      <div
                        style="
                          background-color: #f0f8ff;
                          border-radius: 8px;
                          padding: 20px;
                        "
                      >
                        <span
                          style="
                            font-size: 36px;
                            letter-spacing: 5px;
                            font-weight: bold;
                            color: #007bff;
                          "
                        >
                          ${code}
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-top: 20px">
                      <p style="color: #777777; font-size: 14px; margin: 0">
                        Este código expirará en 10 minutos.<br />
                        Si no solicitaste este correo, puedes ignorarlo.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-top: 30px">
                      <p style="color: #999999; font-size: 12px">
                        © 2025 Mi App. Todos los derechos reservados.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
    });
  }
  async PushCode(code: CodeDto, email: string) {
    await this.prisma.verificationCode.deleteMany({
      where: {
        userId: code.userId,
      },
    });
    const idToken = await this.prisma.verificationCode.create({
      data: {
        userId: code.userId,
        code: code.code,
        expiresAt: new Date(Date.now() + 1000 * 60 * 10),
      },
    });

    return idToken.id;
  }
}
