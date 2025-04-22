import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddExerciseDto {
  @IsNotEmpty()
  @IsNumber()
  routineId: number;

  @IsNotEmpty()
  @IsString()
  exerciseId: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class AddExercisesArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddExerciseDto)
  exercises: AddExerciseDto[];
}
