import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeListSalesUseCase } from '@/use-cases/factories/sale/make-list-sales.js'

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

export async function listSales(req: FastifyRequest, rep: FastifyReply) {
    const querySchema = z.object({
        page: z.coerce.number().min(1).default(1),
        limit: z.coerce.number().min(1).max(100).default(10)
    })

    const queryResult = querySchema.safeParse(req.query)

    if (!queryResult.success) {
        return rep.status(400).send({
            message: 'Validation error',
            issues: queryResult.error.format()
        })
    }

    const { page, limit } = queryResult.data

    try {
        const listSalesUseCase = makeListSalesUseCase()
        const sales = await listSalesUseCase.execute({ page, limit }) as SaleWithRelations[]
        const enrichedSales = sales.map(sale => {
            const totalItems = sale.sale_Pijama.reduce((sum: number, item: SaleItem) => {
                return sum + item.quantity
            }, 0)

            return {
                ...sale,
                totalItems,
                totalPrice: sale.price
            }
        })

        return rep.status(200).send({
            sales: enrichedSales,
            page,
            limit,
            total: enrichedSales.length
        })
    } catch (error: any) {
        return rep.status(400).send({ message: error.message })
    }
}