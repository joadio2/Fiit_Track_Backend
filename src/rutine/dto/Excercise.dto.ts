import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ExerciseDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  bodypartId: number;

  @IsOptional()
  @IsString()
  equipment: string;

  @IsNotEmpty()
  @IsString()
  gifUrl: string;

  @IsOptional()
  @IsString({ each: true })
  instructions: string[];

  @IsOptional()
  @IsString({ each: true })
  secondaryMuscles: string[];

  @IsOptional()
  @IsString()
  target: string;
}

export class CheckExcersiceDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseDto)
  exercises: ExerciseDto[];
}
