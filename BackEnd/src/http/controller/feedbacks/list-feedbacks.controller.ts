import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeListFeedbacksUseCase } from '@/use-cases/factories/feedbacks/make-list-feedbacks.js'

export async function listFeedbacksController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const listQuerySchema = z.object({
    rating: z.coerce.number().min(0).max(5).optional()
  })

  const result = listQuerySchema.safeParse(request.query)

  if (!result.success) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: result.error.format()
    })
  }

  const { rating } = result.data

  try {
    const listFeedbacksUseCase = makeListFeedbacksUseCase()
    const { feedbacks } = await listFeedbacksUseCase.execute({ rating })

    return reply.status(200).send(feedbacks)
  } catch (error: any) {
    return reply.status(400).send({ message: error.message })
  }
}