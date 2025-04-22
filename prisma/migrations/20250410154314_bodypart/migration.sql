/*
  Warnings:

  - You are about to drop the column `bodypart` on the `Routine` table. All the data in the column will be lost.
  - Added the required column `bodypartId` to the `Routine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Routine" DROP COLUMN "bodypart",
ADD COLUMN     "bodypartId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_bodypartId_fkey" FOREIGN KEY ("bodypartId") REFERENCES "Bodypart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
