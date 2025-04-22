import {
  Controller,
  Res,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Delete,
  Param,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { RutineService } from './rutine.service';
import { PrismaService } from 'src/prisma.service';
import { rutineDto } from './dto/rutine.dto';
import { AddExercisesArrayDto } from './dto/addExercise.dto';
import { CheckExcersiceDto } from './dto/Excercise.dto';
import { repsDto } from './dto/reps.dto';
import { DeleteRoutinesDto } from './dto/delete.dto';
@Controller('routine')
export class RutineController {
  constructor(
    private readonly rutineService: RutineService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('newRoutine')
  @UsePipes(ValidationPipe)
  async newRutine(@Body() newRutine: rutineDto, @Res() res: Response) {
    try {
      console.log('newRutine', newRutine);
      const response = await this.rutineService.newRutine(newRutine, res);
      return response;
    } catch (e) {
      console.log(e);
    }
  }
  @Post('checkExercise')
  async checkExcersice(
    @Body() newExercise: CheckExcersiceDto,
    @Res() res: Response,
  ) {
    try {
      const response = await this.rutineService.checkExcersice(
        newExercise,
        res,
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  @Post('addReps')
  @UsePipes(ValidationPipe)
  async addReps(@Body() reps: repsDto, @Res() res: Response) {
    try {
      const response = await this.rutineService.addReps(reps, res);
      return response;
    } catch (e) {
      console.log(e);
    }
  }
  @Post('addExercise')
  @UsePipes(ValidationPipe)
  async addExercise(
    @Body() addExercise: AddExercisesArrayDto,
    @Res() res: Response,
  ) {
    try {
      console.log('addExercise', addExercise);
      const response = await this.rutineService.addExercise(addExercise, res);
      return response;
    } catch (e) {
      console.error(e);
    }
  }
  @Delete('deleteRoutine')
  @UsePipes(ValidationPipe)
  async deleteRutine(@Body() ids: DeleteRoutinesDto, @Res() res: Response) {
    try {
      console.log('ids', ids);
      const response = await this.rutineService.deleteRoutine(ids, res);
      console.log('response', response);
      return response;
    } catch (e) {
      console.log(e);
    }
  }
  @Post('cookie')
  async cookie(@Req() req: Request, @Res() res: Response) {
    try {
      const token = req.cookies['token'];

      if (token) {
        console.log('Token cookie:', token);
        return res.status(200).json({
          message: 'Cookie encontrada',
          token: token,
        });
      } else {
        console.log('No token cookie found');
        return res.status(400).json({
          message: 'Cookie no encontrada',
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Error al leer la cookie',
        error: e.message,
      });
    }
  }
}
