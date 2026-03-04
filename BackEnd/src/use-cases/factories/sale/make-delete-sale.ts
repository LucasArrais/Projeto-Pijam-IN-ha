import { PrismaSaleRepository } from '@/repositories/prisma/sale-prisma-repository.js'
import { DeleteSaleUseCase } from '@/use-cases/sale-use-cases/delete-sale.js'

export function makeDeleteSaleUseCase() {
    const saleRepository = new PrismaSaleRepository()
    const deleteSaleUseCase = new DeleteSaleUseCase(saleRepository)
    return deleteSaleUseCase
}