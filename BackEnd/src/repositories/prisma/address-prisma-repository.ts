import { Prisma } from "@/@types/prisma/client.js";
import { prisma } from "@/libs/prisma.js";
import type { AddressRepository } from "../address-prisma.js";


export class PrismaAddressRepository implements AddressRepository { 

    async create(data: Prisma.AddressCreateInput) {
        return await prisma.address.create({
            data
        })
    }
}