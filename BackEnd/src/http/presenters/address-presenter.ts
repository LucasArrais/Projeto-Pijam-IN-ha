import type { Address } from "@/@types/prisma/client.js";

type HTTPAddress = {
        id: string,
        zipCode: string, 
        state: string,
        city: string, 
        neighborhood: string,
        address: string,
        number: string,
}

export class AddressPresenter {
    static toHTTP(address: Address): HTTPAddress
    static toHTTP(addresss: Address[]): HTTPAddress[]
    static toHTTP(input: Address | Address[]): HTTPAddress | HTTPAddress[] {
        if (Array.isArray(input)) {
            return input.map((address) => this.toHTTP(address))
        }

        return {
            id: input.publicId,
            zipCode: input.zipCode,
            state: input.state,
            city: input.city,
            neighborhood: input.neighborhood,
            address: input.address,
            number: input.number,
        }
    }
}