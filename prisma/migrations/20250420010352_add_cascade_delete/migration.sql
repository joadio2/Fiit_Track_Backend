-- DropForeignKey
ALTER TABLE "ExerciseLog" DROP CONSTRAINT "ExerciseLog_routineId_fkey";

-- DropForeignKey
ALTER TABLE "Routine" DROP CONSTRAINT "Routine_userId_fkey";

-- DropForeignKey
ALTER TABLE "RoutineExercise" DROP CONSTRAINT "RoutineExercise_routineId_fkey";

-- CreateIndex
CREATE INDEX "Goal_userId_exerciseId_idx" ON "Goal"("userId", "exerciseId");

-- CreateIndex
CREATE INDEX "Routine_userId_idx" ON "Routine"("userId");

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineExercise" ADD CONSTRAINT "RoutineExercise_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseLog" ADD CONSTRAINT "ExerciseLog_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
