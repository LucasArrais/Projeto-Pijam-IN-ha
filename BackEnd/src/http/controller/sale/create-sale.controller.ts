import { z } from "zod"
import type { FastifyRequest, FastifyReply } from "fastify"
import { makeCreateSaleUseCase } from "@/use-cases/factories/sale/make-create-sale.js"

export async function createSale(req: FastifyRequest, rep: FastifyReply) {
    const createSaleBodySchema = z.object({
        buyer_name: z.string().min(3),
        cpf: z.string().length(11, 'CPF deve ter 11 dígitos'),
        payment_method: z.string(),
        installments: z.number().min(1).default(1),
        card_number: z.string().optional(),
        zipCode: z.string(),
        state: z.string(),
        city: z.string(),
        neighborhood: z.string(),
        address: z.string(),
        number: z.string(),
        items: z.array(z.object({
            pijamaId: z.number(),
            quantity: z.number().min(1),
            price: z.number().positive()
        })).min(1, 'Adicione pelo menos um item')
    })

    const result = createSaleBodySchema.safeParse(req.body)

    if (!result.success) {
        return rep.status(400).send({
            message: 'Validation error',
            issues: result.error.format()
        })
    }

    const data = result.data

    try {
        const creatSaleUseCase = makeCreateSaleUseCase()
        const { sale, address } = await creatSaleUseCase.execute({
            buyer_name: data.buyer_name,
            cpf: data.cpf,
            payment_method: data.payment_method,
            installments: data.installments,
            card_number: data.card_number ?? undefined,
            zipCode: data.zipCode,
            state: data.state,
            city: data.city,
            neighborhood: data.neighborhood,
            address: data.address,
            number: data.number,
            items: data.items
        })

        return rep.status(201).send({ sale, address })
    } catch (error: any) {
        return rep.status(400).send({ message: error.message })
    }
}