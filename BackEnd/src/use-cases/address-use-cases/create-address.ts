import type { Address } from "@/@types/prisma/client.js"
import type { AddressRepository } from "@/repositories/address-prisma.js"



interface CreateAddressUseCaseRequest {
    zipCode: string
    state: string
    city: string
    neighborhood: string
    address: string
    number: string
}

type CreateAddressUseCaseResponse = {
    addressRecord: Address
}


export class CreateAddressUseCase {
    constructor ( private addressRepository: AddressRepository) {}

    async execute({
        zipCode, 
        state,
        city,
        neighborhood,
        address,
        number,
    }: CreateAddressUseCaseRequest):
    Promise<CreateAddressUseCaseResponse> {

        const addressRecord = await this.addressRepository.create({
            zipCode,
            state,
            city,
            neighborhood,
            address,
            number,
        })

        return { addressRecord }
    }

}