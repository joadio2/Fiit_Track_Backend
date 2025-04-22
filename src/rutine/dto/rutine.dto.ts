import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
export class rutineDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  Description: string;
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @IsNotEmpty()
  @IsString()
  bodyPart: string;
  @IsNotEmpty()
  @IsString()
  routineType: string;
}
