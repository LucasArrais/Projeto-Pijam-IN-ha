import type { Sale, Address } from "@/@types/prisma/client.js"
import type { AddressRepository } from "@/repositories/adress-prisma.js"
import type { SaleRepository } from "@/repositories/sale-prisma.js"

interface CreateSaleItem {
    pijamaId: number
    quantity: number
    price: number
}

interface CreateSaleUseCaseRequest {
    buyer_name: string
    cpf: string
    payment_method: string
    installments: number
    card_number?: string | undefined  
    zipCode: string
    state: string
    city: string
    neighborhood: string
    address: string
    number: string
    items: CreateSaleItem[]
}

type CreateSaleUseCaseResponse = {
    sale: Sale
    address: Address
}

export class CreateSaleUseCase {
    constructor(
        private saleRepository: SaleRepository,
        private addressRepository: AddressRepository 
    ) {}

    async execute(request: CreateSaleUseCaseRequest): Promise<CreateSaleUseCaseResponse> {
        const {
            buyer_name,
            cpf,
            payment_method,
            installments,
            card_number,
            zipCode,
            state,
            city,
            neighborhood,
            address,
            number,
            items
        } = request

        if (items.length === 0) {
            throw new Error('Sale must have at least one item')
        }

        const addressData = await this.addressRepository.create({
            zipCode,
            state,
            city,
            neighborhood,
            address,
            number
        })

        const sale = await this.saleRepository.create({
            buyer_name,
            cpf,
            payment_method,
            installments,
            card_number: card_number || '',
            addressId: addressData.id,
            items
        })

        return { sale, address: addressData }
    }
}