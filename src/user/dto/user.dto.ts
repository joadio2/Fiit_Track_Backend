import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
}
