import z  from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { PijamaPresenter } from "@/http/presenters/pijamas-presenter.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"
import { makeGetPijamaUseCase } from "@/use-cases/factories/pijamas/make-get-pijama-use-case.js"


export async function getPijama (request: FastifyRequest, reply: FastifyReply) {
    try {
        const getParamsSchema = z.object({
            publicId: z.string()
        })
    
        const { publicId } = getParamsSchema.parse(request.params)
   
        const getPijamaUseCase = makeGetPijamaUseCase()
        const { pijama } = await getPijamaUseCase.execute({
            publicId
        })
    
        return reply.status(200).send(PijamaPresenter.toHTTP(pijama))
    } catch (error){
        if(error instanceof ResourceNotFoundError){
            return reply.status(404).send({message: error.message})
        }
        throw error
    }


}