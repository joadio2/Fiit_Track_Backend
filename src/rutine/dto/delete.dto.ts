import { IsArray, ArrayNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteRoutinesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  ids: number[];
}
