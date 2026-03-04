import type { ESTACAO, GENERO, Prisma, TIPO } from "@/@types/prisma/client.js";

export type PijamaWithSizes = Prisma.PijamaGetPayload<{
    include: { pijama_size: true }
  }>

export interface PijamasRepository{
    create(data: Prisma.PijamaCreateInput): Promise<PijamaWithSizes>
    findBy(where: Prisma.PijamaWhereInput): Promise<PijamaWithSizes | null>
    list(): Promise<PijamaWithSizes[]>
    update(id: number, data: Prisma.PijamaUpdateInput): Promise<PijamaWithSizes>
    delete(id: number): Promise<void>
    findManyBy(filters: {season?: ESTACAO, type?: TIPO, gender?: GENERO}): Promise<PijamaWithSizes[]>
}