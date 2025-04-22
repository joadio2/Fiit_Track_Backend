import { IsString, IsNotEmpty, Length, IsNumber } from 'class-validator';
export class CodeDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  code: string;
}
