import { ESTACAO, GENERO, TIPO } from '@/@types/prisma/enums.js'
import { PijamaPresenter } from '@/http/presenters/pijamas-presenter.js'
import { makeGetPijamasByFiltersUseCase } from '@/use-cases/factories/pijamas/make-get-pijamas-by-filters-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function getPijamasByFilters(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const queryParams = z.object({
    season: z.enum(ESTACAO).optional(),
    type: z.enum(TIPO).optional(),
    gender: z.enum(GENERO).optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(12),
  })

  const { season, type, gender, page, limit } = queryParams.parse(request.query)

  const getPijamasByFilters = makeGetPijamasByFiltersUseCase()

  const result = await getPijamasByFilters.execute({
    season,
    type,
    gender,
    page,
    limit,
  })

  return reply.status(200).send({
    data: PijamaPresenter.toHTTP(result.data),
    totalCount: result.totalCount,
    totalPages: result.totalPages,
    currentPage: result.currentPage,
  })
}