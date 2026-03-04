import { ESTACAO, GENERO, TIPO } from '@/@types/prisma/enums.js'
import { PijamaPresenter } from '@/http/presenters/pijamas-presenter.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeUpdatePijamaUseCase } from '@/use-cases/factories/pijamas/make-update-pijama-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function updatePijama(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const updatePijamaParamsSchema = z.object({
      publicId: z.string(),
    })

    const updatePijamaBodySchema = z.object({
      name: z.string().min(1).max(100).optional(),
      description: z.string().min(1).max(1000).optional(),
      image: z.string().optional(),
      price: z.number().positive().optional(),
      season: z.enum(ESTACAO).optional(),
      type: z.enum(TIPO).optional(),
      gender: z.enum(GENERO).optional(),
      on_sale: z.boolean().default(false).optional(),
      sale_percent: z.number().min(0).default(0).optional(),
    })

    const { publicId } = updatePijamaParamsSchema.parse(request.params)
    const data = updatePijamaBodySchema.parse(request.body)

    const updatePijamaUseCase = makeUpdatePijamaUseCase()
    const { pijama } = await updatePijamaUseCase.execute({
      publicId,
      ...data,
      on_sale: data.on_sale,
      sale_percent: data.sale_percent,
    })

    return reply.status(200).send(PijamaPresenter.toHTTP(pijama))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
