/*
  Warnings:

  - Made the column `card_number` on table `sales` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "sale_pijamas" ALTER COLUMN "price" DROP NOT NULL;

-- AlterTable
ALTER TABLE "sales" ALTER COLUMN "card_number" SET NOT NULL;
