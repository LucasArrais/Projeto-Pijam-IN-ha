import type { Sale } from '@/@types/prisma/client.js'
import type { SaleRepository } from '@/repositories/sale-prisma.js'


interface GetSaleRequest {
    publicId: string
}

export class GetSaleUseCase {
    constructor(private saleRepository: SaleRepository) {}

    async execute(request: GetSaleRequest): Promise<Sale | null> {
        const { publicId } = request
        const sale = await this.saleRepository.findByPublicId(publicId)
        return sale
    }
}