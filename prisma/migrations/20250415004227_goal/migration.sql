/*
  Warnings:

  - Added the required column `targetDate` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "targetDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "trackReps" DROP NOT NULL,
ALTER COLUMN "trackWeight" DROP NOT NULL;
