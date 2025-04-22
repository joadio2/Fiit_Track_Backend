-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "equipment" TEXT,
ADD COLUMN     "gifUrl" TEXT,
ADD COLUMN     "instructions" TEXT[],
ADD COLUMN     "secondaryMuscles" TEXT[],
ADD COLUMN     "target" TEXT;
