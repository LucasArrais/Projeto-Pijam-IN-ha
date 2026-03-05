-- CreateEnum
CREATE TYPE "GENERO" AS ENUM ('MASCULINO', 'FEMININO');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "USER_ROLE" NOT NULL DEFAULT 'DEFAULT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedbacks" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "avaliacao" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pijamas" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "season" TEXT NOT NULL,
    "types" INTEGER NOT NULL,
    "gender" "GENERO" NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "on_sale" BOOLEAN NOT NULL DEFAULT false,
    "sale_percent" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pijamas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pijama_sizes" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "stock_quantity" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "pijama_id" INTEGER NOT NULL,

    CONSTRAINT "pijama_sizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "buyer_name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "payment_method" TEXT NOT NULL,
    "installments" INTEGER NOT NULL DEFAULT 1,
    "card_number" TEXT,
    "address_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale_pijamas" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "pijama_id" INTEGER NOT NULL,
    "sale_id" INTEGER NOT NULL,

    CONSTRAINT "sale_pijamas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_public_id_key" ON "users"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_public_id_key" ON "addresses"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "feedbacks_public_id_key" ON "feedbacks"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "pijamas_public_id_key" ON "pijamas"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "pijama_sizes_public_id_key" ON "pijama_sizes"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "pijama_sizes_pijama_id_size_key" ON "pijama_sizes"("pijama_id", "size");

-- CreateIndex
CREATE UNIQUE INDEX "sales_public_id_key" ON "sales"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "sales_cpf_key" ON "sales"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "sale_pijamas_public_id_key" ON "sale_pijamas"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "sale_pijamas_pijama_id_sale_id_key" ON "sale_pijamas"("pijama_id", "sale_id");

-- AddForeignKey
ALTER TABLE "pijama_sizes" ADD CONSTRAINT "pijama_sizes_pijama_id_fkey" FOREIGN KEY ("pijama_id") REFERENCES "pijamas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_pijamas" ADD CONSTRAINT "sale_pijamas_pijama_id_fkey" FOREIGN KEY ("pijama_id") REFERENCES "pijamas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_pijamas" ADD CONSTRAINT "sale_pijamas_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
