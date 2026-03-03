import { Prisma } from "@/@types/prisma/client.js";
import { prisma } from "@/libs/prisma.js";
import type { AddressRepository } from "../address-prisma.js";


export class PrismaAddressRepository implements AddressRepository { 

    async create(data: Prisma.AddressCreateInput) {
        return await prisma.address.create({
            data
        })
    }

    async findBy(where: Prisma.AddressWhereUniqueInput){
        return await prisma.address.findUnique({
            where
        })
        
    }

    async update(id: number, data: Prisma.AddressUpdateInput) {
        return await prisma.address.update({
            where: {id},
            data
        })
    }
}