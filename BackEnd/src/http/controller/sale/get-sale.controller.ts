import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetSaleUseCase } from '@/use-cases/factories/sale/make-get-sale.js'

interface SaleItem {
    quantity: number
    price: number | null
}

interface SaleWithRelations {
    id: number
    publicId: string
    buyer_name: string
    cpf: string
    price: number | null
    payment_method: string
    installments: number
    card_number: string
    addressId: number
    createdAt: Date
    address: any
    sale_Pijama: SaleItem[]
}

export async function getSale(req: FastifyRequest, rep: FastifyReply) {
    const paramsSchema = z.object({
        publicId: z.string().uuid()
    })

    const paramsResult = paramsSchema.safeParse(req.params)

    if (!paramsResult.success) {
        return rep.status(400).send({
            message: 'Invalid publicId format'
        })
    }

    const { publicId } = paramsResult.data

    try {
        const getSaleUseCase = makeGetSaleUseCase()
        const sale = await getSaleUseCase.execute({ publicId }) as SaleWithRelations | null

        if (!sale) {
            return rep.status(404).send({ message: 'Sale not found' })
        }
        const totalItems = sale.sale_Pijama.reduce((sum: number, item: SaleItem) => {
            return sum + item.quantity
        }, 0)

        const response = {
            ...sale,
            totalItems,
            totalPrice: sale.price
        }

        return rep.status(200).send(response)
    } catch (error: any) {
        return rep.status(400).send({ message: error.message })
    }
}