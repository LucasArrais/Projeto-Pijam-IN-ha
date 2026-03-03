import { z } from "zod"
import type { FastifyRequest, FastifyReply } from "fastify"
import { AddressPresenter } from "@/http/presenters/address-presenter.js"
import { makeUpdateAddressUseCase } from "@/use-cases/factories/address/make-update-usecase.js"




export async function updateAddress(req: FastifyRequest, rep: FastifyReply) {

    const updateAddressParamsSchema = z.object({
        publicId: z.string()
    })

    const { publicId } = updateAddressParamsSchema.parse(req.params)

    const updateAddressBodySchema = z.object({
            zipCode : z.string().min(1).max(50),
            state: z.string(),
            city: z.string().min(1).max(50),
            neighborhood: z.string(),
            address: z.string(),
            number: z.string(),
        })

    const { zipCode, state, city, neighborhood, address, number } = updateAddressBodySchema.parse(req.body)

    const UpdateAdressUseCase = makeUpdateAddressUseCase()
    const { addressRecord } = await UpdateAdressUseCase.execute({
        publicId,
        zipCode, 
        state,
        city,
        neighborhood,
        address,
        number
    })

    return rep.status(201).send(AddressPresenter.toHTTP(addressRecord))
}