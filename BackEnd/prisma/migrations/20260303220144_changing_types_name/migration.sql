/*
  Warnings:

  - You are about to drop the column `types` on the `pijamas` table. All the data in the column will be lost.
  - Added the required column `type` to the `pijamas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pijamas" DROP COLUMN "types",
ADD COLUMN     "type" "TIPO" NOT NULL;
