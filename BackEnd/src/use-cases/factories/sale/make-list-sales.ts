import { PrismaSaleRepository } from '@/repositories/prisma/sale-prisma-repository.js'
import { ListSalesUseCase } from '@/use-cases/sale-use-cases/list-sales.js'

export function makeListSalesUseCase() {
    const saleRepository = new PrismaSaleRepository()
    const listSalesUseCase = new ListSalesUseCase(saleRepository)
    return listSalesUseCase
}