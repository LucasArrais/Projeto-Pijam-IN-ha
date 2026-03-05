import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeDeleteSaleUseCase } from '@/use-cases/factories/sale/make-delete-sale.js'

export async function deleteSale(req: FastifyRequest, rep: FastifyReply) {
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
        const deleteSaleUseCase = makeDeleteSaleUseCase()
        await deleteSaleUseCase.execute({ publicId })

        return rep.status(204).send()
    } catch (error: any) {
        if (error.message === 'Sale not found') {
            return rep.status(404).send({ message: 'Venda não encontrada' })
        }
        return rep.status(400).send({ message: error.message })
    }
}