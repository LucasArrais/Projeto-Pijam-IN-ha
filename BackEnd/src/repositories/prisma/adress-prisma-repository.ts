import { prisma } from "@/libs/prisma.js"
import type { Address } from "@/@types/prisma/client.js"
import type { AddressRepository } from "../adress-prisma.js"

export class PrismaAddressRepository implements AddressRepository {
    async create(data: any): Promise<Address> {
        const address = await prisma.address.create({
            data
        })
        return address
    }
}