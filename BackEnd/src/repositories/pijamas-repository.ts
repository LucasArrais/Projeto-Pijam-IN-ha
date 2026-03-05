import type { ESTACAO, GENERO, Prisma, TIPO } from '@/@types/prisma/client.js'

export type PijamaWithSizes = Prisma.PijamaGetPayload<{
  include: { pijama_size: true }
}>

interface ListPijamasQuery {
  name?: string
  page?: number
  limit?: number
}

export interface ListPijamasResponse {
  data: PijamaWithSizes[]
  totalCount: number
  totalPages: number
  currentPage: number
}

export interface FindManyByFilters {
  season?: ESTACAO
  type?: TIPO
  gender?: GENERO
  page?: number
  limit?: number
}

export interface FindManyByResponse {
  data: PijamaWithSizes[]
  totalCount: number
  totalPages: number
  currentPage: number
}

export interface PijamasRepository {
  create(data: Prisma.PijamaCreateInput): Promise<PijamaWithSizes>
  findBy(where: Prisma.PijamaWhereInput): Promise<PijamaWithSizes | null>
  list(query: ListPijamasQuery): Promise<ListPijamasResponse>
  update(id: number, data: Prisma.PijamaUpdateInput): Promise<PijamaWithSizes>
  delete(id: number): Promise<void>
  findManyBy(filters: FindManyByFilters): Promise<FindManyByResponse>
}