/*
  Warnings:

  - You are about to drop the column `isComplete` on the `Goal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "isComplete",
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;
