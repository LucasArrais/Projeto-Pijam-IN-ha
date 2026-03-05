import type { Sale } from '@/@types/prisma/client.js'
import type { SaleRepository } from '@/repositories/sale-prisma.js'


interface ListSalesRequest {
    page: number
    limit: number
}

export class ListSalesUseCase {
    constructor(private saleRepository: SaleRepository) {}

    async execute(request: ListSalesRequest): Promise<Sale[]> {
        const { page, limit } = request
        const sales = await this.saleRepository.list(page, limit)
        return sales
    }
}