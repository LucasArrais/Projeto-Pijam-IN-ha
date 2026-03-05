import type { Address } from "@/@types/prisma/client.js"
import type { AddressRepository } from "@/repositories/address-prisma.js"



interface UpdateAddressUseCaseRequest {
    publicId: string,
    zipCode: string,
    state: string,
    city: string,
    neighborhood: string,
    address: string,
    number: string,
}

type UpdateAddressUseCaseResponse = {
    addressRecord: Address
}


export class UpdateAddressUseCase {
    constructor ( private addressRepository: AddressRepository) {}

    async execute({
        publicId,
        zipCode, 
        state,
        city,
        neighborhood,
        address,
        number,
    }: UpdateAddressUseCaseRequest):
    Promise<UpdateAddressUseCaseResponse> {

        const findAddress = await this.addressRepository.findBy({ publicId })

        if (!findAddress) {
            throw new Error("endereço não encontrado")
        }

        const addressRecord = await this.addressRepository.update( findAddress.id , {
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