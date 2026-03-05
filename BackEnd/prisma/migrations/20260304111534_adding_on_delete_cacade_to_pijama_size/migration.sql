-- DropForeignKey
ALTER TABLE "pijama_sizes" DROP CONSTRAINT "pijama_sizes_pijama_id_fkey";

-- AddForeignKey
ALTER TABLE "pijama_sizes" ADD CONSTRAINT "pijama_sizes_pijama_id_fkey" FOREIGN KEY ("pijama_id") REFERENCES "pijamas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
