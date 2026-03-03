import type { Prisma } from "@/@types/prisma/client.js";
import { prisma } from "@/libs/prisma.js";
import type { PijamasRepository } from "../pijamas-repository.js";

export class PrismaPijamasRepository implements PijamasRepository{
    async create(data: Prisma.PijamaCreateInput){
        return await prisma.pijama.create({data})
    }
    async findBy(where: Prisma.PijamaWhereInput){
        return await prisma.pijama.findFirst({where})
    }
    async list(){
        return await prisma.pijama.findMany()
    }
    async update(id: number, data: Prisma.PijamaUpdateInput){
        return await prisma.pijama.update({
            where: {id},
            data,
        })
    }
    async delete(id: number){
        await prisma.pijama.delete({
            where: {id},
        })
    }

}