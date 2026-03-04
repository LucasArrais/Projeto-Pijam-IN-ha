import type { FastifyReply, FastifyRequest } from "fastify"
import { PijamaPresenter } from "@/http/presenters/pijamas-presenter.js"
import { makeListPijamaUseCase } from "@/use-cases/factories/pijamas/make-list-pijama-use-case.js"


export async function listPijama (_request: FastifyRequest, reply: FastifyReply) {
    try {
        const listPijamasUseCase = makeListPijamaUseCase()
        const { pijamas } = await listPijamasUseCase.execute()
    
        return reply.status(200).send(PijamaPresenter.toHTTP(pijamas))
    } catch (error){
        
        throw error
    }


}