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
  })

  const { season, type, gender } = queryParams.parse(request.query)

  const getPijamasByFilters = makeGetPijamasByFiltersUseCase()

  const { pijamas } = await getPijamasByFilters.execute({
    season,
    type,
    gender,
  })

  return reply.status(200).send(PijamaPresenter.toHTTP(pijamas))
}
