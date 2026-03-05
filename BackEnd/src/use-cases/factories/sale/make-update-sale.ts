import { PrismaSaleRepository } from '@/repositories/prisma/sale-prisma-repository.js'
import { UpdateSaleUseCase } from '@/use-cases/sale-use-cases/update-sale.js'

export function makeUpdateSaleUseCase() {
    const saleRepository = new PrismaSaleRepository()
    const updateSaleUseCase = new UpdateSaleUseCase(saleRepository)
    return updateSaleUseCase
}