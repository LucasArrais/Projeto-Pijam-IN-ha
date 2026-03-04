import type { Address } from "@/@types/prisma/client.js"

export interface AddressRepository {
    create(data: any): Promise<Address>
}