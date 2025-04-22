/*
  Warnings:

  - You are about to drop the column `reps` on the `RoutineExercise` table. All the data in the column will be lost.
  - You are about to drop the column `restSeconds` on the `RoutineExercise` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `RoutineExercise` table. All the data in the column will be lost.
  - Added the required column `userId` to the `RoutineExercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_trainingTypeId_fkey";

-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "trainingTypeId" DROP NOT NULL;
DROP SEQUENCE "Exercise_id_seq";

-- AlterTable
ALTER TABLE "RoutineExercise" DROP COLUMN "reps",
DROP COLUMN "restSeconds",
DROP COLUMN "weight",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "orderIndex" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ExerciseLog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "routineId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "restSeconds" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExerciseLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_trainingTypeId_fkey" FOREIGN KEY ("trainingTypeId") REFERENCES "TrainingType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineExercise" ADD CONSTRAINT "RoutineExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseLog" ADD CONSTRAINT "ExerciseLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseLog" ADD CONSTRAINT "ExerciseLog_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseLog" ADD CONSTRAINT "ExerciseLog_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
