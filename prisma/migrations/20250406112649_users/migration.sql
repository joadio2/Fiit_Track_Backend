/*
  Warnings:

  - You are about to drop the column `givenName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "givenName",
ADD COLUMN     "password" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ALTER COLUMN "googleId" DROP NOT NULL,
ALTER COLUMN "picture" DROP NOT NULL,
ALTER COLUMN "locale" DROP NOT NULL;
