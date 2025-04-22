/*
  Warnings:

  - Added the required column `bodypart` to the `Routine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `routineType` to the `Routine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Routine" ADD COLUMN     "bodypart" INTEGER NOT NULL,
ADD COLUMN     "routineType" TEXT NOT NULL;
