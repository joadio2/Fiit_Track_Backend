/*
  Warnings:

  - The primary key for the `Exercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `trainingTypeId` on the `Exercise` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_trainingTypeId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseLog" DROP CONSTRAINT "ExerciseLog_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "RoutineExercise" DROP CONSTRAINT "RoutineExercise_exerciseId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_pkey",
DROP COLUMN "trainingTypeId",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ExerciseLog" ALTER COLUMN "exerciseId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Goal" ALTER COLUMN "exerciseId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "RoutineExercise" ALTER COLUMN "exerciseId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_id_key" ON "Exercise"("id");

-- AddForeignKey
ALTER TABLE "RoutineExercise" ADD CONSTRAINT "RoutineExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseLog" ADD CONSTRAINT "ExerciseLog_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
