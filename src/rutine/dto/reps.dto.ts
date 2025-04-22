import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  isString,
  IsEmpty,
} from 'class-validator';
export class repsDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @IsNotEmpty()
  @IsNumber()
  routineId: number;
  @IsNotEmpty()
  @IsString()
  exerciseId: string;
  @IsNotEmpty()
  @IsNumber()
  reps: number;
  @IsNotEmpty()
  @IsNumber()
  weight: number;
  @IsOptional()
  @IsString()
  notes: string;
  @IsOptional()
  @IsNumber()
  restSeconds: number;
}
