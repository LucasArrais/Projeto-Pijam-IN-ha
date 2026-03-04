import { PrismaSaleRepository } from '@/repositories/prisma/sale-prisma-repository.js'
import { GetSaleUseCase } from '@/use-cases/sale-use-cases/get-sale.js'

export function makeGetSaleUseCase() {
    const saleRepository = new PrismaSaleRepository()
    const getSaleUseCase = new GetSaleUseCase(saleRepository)
    return getSaleUseCase
}