/*
  Warnings:

  - A unique constraint covering the columns `[address_id]` on the table `sales` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_address_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "sales_address_id_key" ON "sales"("address_id");

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
