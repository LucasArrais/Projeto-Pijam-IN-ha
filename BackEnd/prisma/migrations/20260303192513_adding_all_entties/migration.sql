/*
  Warnings:

  - Changed the type of `size` on the `pijama_sizes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TAMANHO" AS ENUM ('PP', 'P', 'M', 'G', 'GG');

-- AlterTable
ALTER TABLE "pijama_sizes" DROP COLUMN "size",
ADD COLUMN     "size" "TAMANHO" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pijama_sizes_pijama_id_size_key" ON "pijama_sizes"("pijama_id", "size");
