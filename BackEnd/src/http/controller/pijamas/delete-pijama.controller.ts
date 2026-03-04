import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { makeDeletePijamaUseCase } from "@/use-cases/factories/pijamas/make-delete-pijama-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from 'zod'

export async function deletePijama (request: FastifyRequest, reply: FastifyReply) {
    try {
        const deletePijamaParamsSchema = z.object({
            publicId: z.string()
        })

        const {publicId} = deletePijamaParamsSchema.parse(request.params)
        const deletePijamaUseCase = makeDeletePijamaUseCase()
        await deletePijamaUseCase.execute({
            publicId
        })
        return reply.status(200).send()
    }catch (error){
        if(error instanceof ResourceNotFoundError){
            return reply.status(404).send({message: error.message})
        }
        throw error
    }
}