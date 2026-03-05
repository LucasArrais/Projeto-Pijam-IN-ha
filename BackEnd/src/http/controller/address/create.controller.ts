import { z } from "zod"
import type { FastifyRequest, FastifyReply } from "fastify"
import { makeCreateAddressUseCase } from "@/use-cases/factories/address/make-create-usecase.js"
import { AddressPresenter } from "@/http/presenters/address-presenter.js"




export async function createAddress(req: FastifyRequest, rep: FastifyReply) {

    const createAddressBodySchema = z.object({
            zipCode : z.string().min(1).max(50),
            state: z.string(),
            city: z.string().min(1).max(50),
            neighborhood: z.string(),
            address: z.string(),
            number: z.string(),
        })

    const { zipCode, state, city, neighborhood, address, number } = createAddressBodySchema.parse(req.body)

    const createAdressUseCase = makeCreateAddressUseCase()
    const { addressRecord } = await createAdressUseCase.execute({
        zipCode, 
        state,
        city,
        neighborhood,
        address,
        number
    })

    return rep.status(201).send(AddressPresenter.toHTTP(addressRecord))
}