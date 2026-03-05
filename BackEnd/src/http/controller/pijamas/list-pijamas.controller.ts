import type { FastifyReply, FastifyRequest } from 'fastify'
import { PijamaPresenter } from '@/http/presenters/pijamas-presenter.js'
import { makeListPijamaUseCase } from '@/use-cases/factories/pijamas/make-list-pijama-use-case.js'
import z from 'zod'


export async function listPijama(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const ListPijamasQuerySchema = z.object({
      name: z.string().optional(),
      page: z.coerce.number().optional(),
      limit: z.coerce.number().optional(),
    })

    const { name, page, limit} = ListPijamasQuerySchema.parse(request.query)

    const listPijamasUseCase = makeListPijamaUseCase()

    const { pijamas, totalCount, totalPages, currentPage } = await listPijamasUseCase.execute({
      name, page, limit
    })

    return reply.status(200).send({
      pijamas: PijamaPresenter.toHTTP(pijamas),
      totalCount,
      totalPages,
      currentPage
    })
  } catch (error) {
    throw error
  }
}
