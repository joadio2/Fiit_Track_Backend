import {
  Controller,
  UsePipes,
  Get,
  Post,
  Body,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { EmailService } from 'src/email/email.service';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async newUser(@Body() user: UserDto, @Res() res: Response) {
    return await this.userService.newUser(user, res);
  }
}
