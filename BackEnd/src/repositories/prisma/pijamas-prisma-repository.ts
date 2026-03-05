import type { Prisma} from '@/@types/prisma/client.js'
import { prisma } from '@/libs/prisma.js'
import type { FindManyByFilters, PijamasRepository } from '../pijamas-repository.js'

export class PrismaPijamasRepository implements PijamasRepository {
  async create(data: Prisma.PijamaCreateInput) {
    return await prisma.pijama.create({
      data,
      include: {
        pijama_size: true,
      },
    })
  }

  async findBy(where: Prisma.PijamaWhereInput) {
    return await prisma.pijama.findFirst({
      where,
      include: {
        pijama_size: true,
      },
    })
  }

  async list({
    name,
    page = 1,
    limit = 12,
  }: {
    name?: string
    page?: number
    limit?: number
  }) {
    const skip = (page - 1) * limit

    const where: Prisma.PijamaWhereInput = {
      name: name
        ? {
            contains: name,
            mode: 'insensitive',
          }
        : undefined,
    }

    const pijamas = await prisma.pijama.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        name: 'asc',
      },
      include: {
        pijama_size: true
      }
    })

    const totalCount = await prisma.pijama.count({ where })
    const totalPages = Math.ceil(totalCount / limit)

    return {
      data: pijamas,
      totalCount,
      totalPages,
      currentPage: page,
    }
  }

  async update(id: number, data: Prisma.PijamaUpdateInput) {
    return await prisma.pijama.update({
      where: { id },
      data,
      include: {
        pijama_size: true,
      },
    })
  }

  async delete(id: number) {
    await prisma.pijama.delete({
      where: { id },
    })
  }

  async findManyBy(filters: FindManyByFilters) {
    const { season, type, gender, page = 1, limit = 12 } = filters
    const skip = (page - 1) * limit

    const where: Prisma.PijamaWhereInput = {
      ...(season && { season }),
      ...(type && { type }),
      ...(gender && { gender }),
    }

    const pijamas = await prisma.pijama.findMany({
      where,
      skip,
      take: limit,
      include: {
        pijama_size: true,
      },
    })

    const totalCount = await prisma.pijama.count({ where })
    const totalPages = Math.ceil(totalCount / limit)

    return {
      data: pijamas,
      totalCount,
      totalPages,
      currentPage: page,
    }
  }
}