/*
  Warnings:

  - Changed the type of `season` on the `pijamas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `types` on the `pijamas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TIPO" AS ENUM ('INFANTIL', 'ADULTO');

-- CreateEnum
CREATE TYPE "ESTACAO" AS ENUM ('INVERNO', 'VERAO');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "GENERO" ADD VALUE 'UNISSEX';
ALTER TYPE "GENERO" ADD VALUE 'FAMILIA';

-- AlterTable
ALTER TABLE "pijamas" DROP COLUMN "season",
ADD COLUMN     "season" "ESTACAO" NOT NULL,
DROP COLUMN "types",
ADD COLUMN     "types" "TIPO" NOT NULL;
