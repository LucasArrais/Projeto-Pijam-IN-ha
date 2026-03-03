import type { Prisma, Address } from "@/@types/prisma/client.js";

export interface AddressRepository {
    create(data: Prisma.AddressCreateInput): Promise<Address>
    findBy(where: Prisma.AddressWhereUniqueInput): Promise<Address | null>
    update(id: number, data: Prisma.AddressUpdateInput): Promise<Address>
}