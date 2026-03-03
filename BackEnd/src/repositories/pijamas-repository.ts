import type { Prisma, Pijama } from "@/@types/prisma/client.js";

export interface PijamasRepository{
    create(data: Prisma.PijamaCreateInput): Promise<Pijama>
    findBy(where: Prisma.PijamaWhereInput): Promise<Pijama | null>
    list(): Promise<Pijama[]>
    update(id: number, data: Prisma.PijamaUpdateInput): Promise<Pijama>
    delete(id: number): Promise<void>
}