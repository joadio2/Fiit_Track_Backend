import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalController } from './goal.controller';
import { PrismaService } from '../prisma.service';
@Module({
  controllers: [GoalController],
  providers: [GoalService, PrismaService],
})
export class GoalModule {}
