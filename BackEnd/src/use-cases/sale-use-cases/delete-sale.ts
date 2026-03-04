import type { SaleRepository } from '@/repositories/sale-prisma.js'

interface DeleteSaleRequest {
    publicId: string
}

export class DeleteSaleUseCase {
    constructor(private saleRepository: SaleRepository) {}

    async execute(request: DeleteSaleRequest): Promise<void> {
        const { publicId } = request
        await this.saleRepository.delete(publicId)
    }
}