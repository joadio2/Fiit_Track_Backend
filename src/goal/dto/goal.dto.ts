import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GoalDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  exerciseId: string;

  @IsNotEmpty()
  @IsNumber()
  targetReps: number;

  @IsNotEmpty()
  @IsNumber()
  targetWeight: number;

  @IsOptional()
  @IsBoolean()
  trackReps: boolean;

  @IsOptional()
  @IsBoolean()
  trackWeight: boolean;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  targetDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsNotEmpty()
  @IsBoolean()
  isCompleted: boolean;
}
