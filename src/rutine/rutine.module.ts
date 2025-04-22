import { Module } from '@nestjs/common';
import { RutineService } from './rutine.service';
import { RutineController } from './rutine.controller';
import { PrismaService } from 'src/prisma.service';
@Module({
  controllers: [RutineController],
  providers: [PrismaService, RutineService],
})
export class RutineModule {}
