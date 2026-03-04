import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateSaleUseCase } from '@/use-cases/factories/sale/make-update-sale.js'

export async function updateSale(req: FastifyRequest, rep: FastifyReply) {
    const paramsSchema = z.object({
        publicId: z.string().uuid()
    })

    const updateSaleBodySchema = z.object({
        buyer_name: z.string().min(3).optional(),
        cpf: z.string().length(11).optional(),
        payment_method: z.string().optional(),
        installments: z.number().min(1).optional(),
        card_number: z.string().optional()
    })

    const paramsResult = paramsSchema.safeParse(req.params)
    if (!paramsResult.success) {
        return rep.status(400).send({
            message: 'Invalid publicId format'
        })
    }

    const bodyResult = updateSaleBodySchema.safeParse(req.body)
    if (!bodyResult.success) {
        return rep.status(400).send({
            message: 'Validation error',
            issues: bodyResult.error.format()
        })
    }

    const { publicId } = paramsResult.data
    const data = bodyResult.data

    try {
        const updateSaleUseCase = makeUpdateSaleUseCase()
        const sale = await updateSaleUseCase.execute({
            publicId,
            ...data
        })

        return rep.status(200).send(sale)
    } catch (error: any) {
        if (error.message === 'Sale not found') {
            return rep.status(404).send({ message: 'Venda não encontrada' })
        }
        return rep.status(400).send({ message: error.message })
    }
}