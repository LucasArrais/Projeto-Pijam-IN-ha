import type { Prisma } from "@/@types/prisma/client.js";
import { prisma } from "@/libs/prisma.js";
import type { PijamasRepository } from "../pijamas-repository.js";



export class PrismaPijamasRepository implements PijamasRepository{
    async create(data: Prisma.PijamaCreateInput){
        return await prisma.pijama.create({data,
            include: {
                pijama_size: true,
            }
        })
    }
    async findBy(where: Prisma.PijamaWhereInput){
        return await prisma.pijama.findFirst({
            where,
            include: {
                pijama_size: true,
            }
        })
    }
    async list(){
        return await prisma.pijama.findMany({
            include: {
                pijama_size: true,
            }
        })
    }
    async update(id: number, data: Prisma.PijamaUpdateInput){
        return await prisma.pijama.update({
            where: {id},
            data,
            include: {
                pijama_size: true,
            }
        })
    }
    async delete(id: number){
        await prisma.pijama.delete({
            where: {id},
        })
    }

}