import { PrismaAddressRepository } from '@/repositories/prisma/adress-prisma-repository.js'
import { PrismaSaleRepository } from '@/repositories/prisma/sale-prisma-repository.js'
import { CreateSaleUseCase } from '@/use-cases/sale-use-cases/create-sale.js'

export function makeCreateSaleUseCase() {
    const saleRepository = new PrismaSaleRepository()
    const addressRepository = new PrismaAddressRepository()
    const createSaleUseCase = new CreateSaleUseCase(saleRepository, addressRepository)
    return createSaleUseCase
}