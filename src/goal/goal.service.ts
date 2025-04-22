import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GoalDto } from './dto/goal.dto';
import { Response } from 'express';
@Injectable()
export class GoalService {
  constructor(private prisma: PrismaService) {}
  async addGoal(goalDto: GoalDto, res: Response) {
    try {
      const goal = await this.prisma.goal.create({
        data: goalDto,
      });
      if (goal !== null) {
        return res
          .status(HttpStatus.OK)
          .json({ message: 'Goal created', goalAdd: goal });
      }
      return goal;
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Error creating goal' });
    }
  }
}
