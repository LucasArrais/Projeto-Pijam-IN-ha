import type { Prisma, Address } from "@/@types/prisma/client.js";

export interface AddressRepository {
    create(data: Prisma.AddressCreateInput): Promise<Address>
}