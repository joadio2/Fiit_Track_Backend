import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class LoginDataDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
