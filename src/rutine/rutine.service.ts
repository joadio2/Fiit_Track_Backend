import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { rutineDto } from './dto/rutine.dto';
import { CheckExcersiceDto } from './dto/Excercise.dto';
import { AddExercisesArrayDto } from './dto/addExercise.dto';
import { repsDto } from './dto/reps.dto';
import { DeleteRoutinesDto } from './dto/delete.dto';
@Injectable()
export class RutineService {
  constructor(private prisma: PrismaService) {}
  async newRutine(newRutine: rutineDto, res: Response) {
    try {
      const checkBodyPart = await this.prisma.bodypart.findFirst({
        where: {
          name: newRutine.bodyPart,
        },
      });

      if (checkBodyPart === null) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Error al crear rutina',
          error: 'El nombre del cuerpo no existe',
        });
      }
      const createRoutine = await this.prisma.routine.create({
        data: {
          name: newRutine.name,
          description: newRutine.Description,
          userId: newRutine.userId,
          routineType: newRutine.routineType,
          bodypartId: checkBodyPart.id,
        },
      });
      if (createRoutine !== null) {
        return res.status(HttpStatus.OK).json({
          message: 'Rutina creada',
          newRoutine: createRoutine,
        });
      }
    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al crear rutina',
        error: e.message,
      });
    }
  }
  async checkExcersice(newExercise: CheckExcersiceDto, res: Response) {
    try {
      const { exercises } = newExercise;
      console.log('Received Exercise:', newExercise);

      const existing = await this.prisma.exercise.findMany({
        where: {
          id: { in: exercises.map((exercise) => exercise.id) },
        },
      });

      const existingExerciseIds = existing.map((item) => item.id);

      const exercisesToAdd = exercises.filter(
        (exercise) => !existingExerciseIds.includes(exercise.id),
      );

      if (exercisesToAdd.length > 0) {
        await this.prisma.exercise.createMany({
          data: exercisesToAdd,
        });
        return res.status(HttpStatus.OK).json({
          message: 'Exercises added successfully.',
          addedExercises: exercisesToAdd,
        });
      }

      return res.status(HttpStatus.OK).json({
        message: 'No new exercises to add. All exercises already exist.',
        existingExercises: existing,
      });
    } catch (e) {
      console.log('Error:', e);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error while creating exercise',
        error: e.message,
      });
    }
  }

  async addExercise(addExercise: AddExercisesArrayDto, res: Response) {
    try {
      const { exercises } = addExercise;
      console.log('exercises', exercises);
      const exerciseIds = exercises.map((exercise) => exercise.exerciseId);
      const userIds = exercises.map((exercise) => exercise.userId);

      const existingExercises = await this.prisma.routineExercise.findMany({
        where: {
          exerciseId: { in: exerciseIds },
          userId: { in: userIds },
        },
      });
      const existingExerciseIds = existingExercises.map(
        (exercise) => exercise.exerciseId,
      );
      const exercisesToAdd = exercises.filter(
        (exercise) => !existingExerciseIds.includes(exercise.exerciseId),
      );

      if (exercisesToAdd.length > 0) {
        await this.prisma.routineExercise.createMany({
          data: exercisesToAdd,
        });
        return res.status(HttpStatus.CREATED).json({
          message: 'Exercises added successfully.',
          addedExercises: exercisesToAdd,
        });
      }

      return res.status(HttpStatus.OK).json({
        message: 'All exercises already exist.',
      });
    } catch (e) {
      console.log('errot ', e);

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al crear ejercicio',
        error: e.message,
      });
    }
  }
  async addReps(reps: repsDto, res: Response) {
    try {
      const newLog = await this.prisma.exerciseLog.create({
        data: reps,
      });

      if (newLog !== null) {
        const checkGoal = await this.prisma.goal.findFirst({
          where: {
            exerciseId: reps.exerciseId,
            userId: reps.userId,
            isCompleted: false,
          },
        });

        if (checkGoal && checkGoal !== null) {
          const reachedReps =
            typeof checkGoal.targetReps === 'number' &&
            reps.reps >= checkGoal.targetReps;

          const reachedWeight =
            typeof checkGoal.targetWeight === 'number' &&
            reps.weight >= checkGoal.targetWeight;

          const goalAchieved =
            (checkGoal.trackReps &&
              checkGoal.trackWeight &&
              reachedReps &&
              reachedWeight) ||
            (checkGoal.trackReps && !checkGoal.trackWeight && reachedReps) ||
            (!checkGoal.trackReps && checkGoal.trackWeight && reachedWeight);

          if (goalAchieved) {
            const updateGoal = await this.prisma.goal.update({
              where: {
                id: checkGoal.id,
              },
              data: {
                isCompleted: true,
                completedAt: new Date(),
              },
            });

            return res.status(HttpStatus.OK).json({
              message: 'Nuevo ejercicio creado',
              reps: newLog,
              completed: true,
              goal: updateGoal,
            });
          }
        }
        return res.status(HttpStatus.OK).json({
          message: 'Nuevo ejercicio creado',
          reps: newLog,
        });
      }
    } catch (e) {
      console.log('errot ', e);

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al crear ejercicio',
        error: e.message,
      });
    }
  }
  async deleteRoutine(idsDto: DeleteRoutinesDto, res: Response) {
    try {
      const ids = idsDto.ids;
      const deleteResult = await this.prisma.routine.deleteMany({
        where: {
          id: { in: ids },
        },
      });
      if (deleteResult.count > 0) {
        return res.status(HttpStatus.OK).json({
          message: 'Routines deleted',
          count: deleteResult.count,
        });
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'No routines found to delete',
        });
      }
    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error to delete routine',
        error: e.message,
      });
    }
  }
}
