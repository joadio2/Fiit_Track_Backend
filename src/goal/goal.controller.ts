import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { GoalService } from './goal.service';
import { GoalDto } from './dto/goal.dto';
@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}
  @Post('add')
  @UsePipes(ValidationPipe)
  async addGoal(@Body() goalDto: GoalDto, @Res() res: Response) {
    return this.goalService.addGoal(goalDto, res);
  }
}
