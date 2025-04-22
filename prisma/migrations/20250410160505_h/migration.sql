/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Bodypart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bodypart_name_key" ON "Bodypart"("name");
