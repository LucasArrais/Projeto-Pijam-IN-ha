import type { Sale } from '@/@types/prisma/client.js'
import type { SaleRepository } from '@/repositories/sale-prisma.js'


interface UpdateSaleRequest {
    publicId: string
    buyer_name?: string | undefined
    cpf?: string | undefined
    payment_method?: string | undefined
    installments?: number | undefined
    card_number?: string | undefined
}

export class UpdateSaleUseCase {
    constructor(private saleRepository: SaleRepository) {}

    async execute(request: UpdateSaleRequest): Promise<Sale> {
        const { publicId, ...data } = request

        const existingSale = await this.saleRepository.findByPublicId(publicId)
        if (!existingSale) {
            throw new Error('Sale not found')
        }

        const sale = await this.saleRepository.update(publicId, data)
        return sale
    }
}