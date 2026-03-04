import { PijamaPresenter } from "@/http/presenters/pijamas-presenter.js";
import { makeCreatePijamaUseCase } from "@/use-cases/factories/pijamas/make-create-pijama-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from 'zod'

export async function createPijama(request: FastifyRequest, reply: FastifyReply) {
    try {
        const createPijamaBodySchema = z.object({
            name: z.string().min(1).max(100),
            description: z.string().min(1).max(1000),
            image: z.string(),
            price: z.number().positive(),
            season: z.enum(["INVERNO", "VERAO"]),
            type: z.enum(["INFANTIL", "ADULTO"]),
            gender: z.enum(["UNISSEX", "MASCULINO", "FEMININO", "FAMILIA"]),
            on_sale: z.boolean().default(false),
            sale_percent: z.number().min(0).default(0),
        })

        const { name, description, image, price, season, type, gender, on_sale, sale_percent, } = createPijamaBodySchema.parse(request.body)
        
        const createPijamaUseCase = makeCreatePijamaUseCase()

        const { pijama } = await createPijamaUseCase.execute({name, description, image, price, season, type, gender, on_sale: on_sale, sale_percent: sale_percent,})

        return reply.status(201).send(
            PijamaPresenter.toHTTP(pijama)
        )
    } catch (error) {
        console.error("ERRO NO CREATE PIJAMA:", error)
        throw error
    }
}