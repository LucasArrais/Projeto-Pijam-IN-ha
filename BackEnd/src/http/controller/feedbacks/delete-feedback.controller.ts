import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeDeleteFeedbackUseCase } from '@/use-cases/factories/feedbacks/make-delete-feedback.js'

export async function deleteFeedbackController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    publicId: z.string().uuid()
  })

  const paramsResult = paramsSchema.safeParse(request.params)
  if (!paramsResult.success) {
    return reply.status(400).send({
      message: 'Invalid publicId format'
    })
  }

  const { publicId } = paramsResult.data

  try {
    const deleteFeedbackUseCase = makeDeleteFeedbackUseCase()
    await deleteFeedbackUseCase.execute({ publicId })

    return reply.status(204).send()
  } catch (error: any) {
    if (error.message === 'Feedback not found') {
      return reply.status(404).send({ message: 'Feedback não encontrado' })
    }
    return reply.status(400).send({ message: error.message })
  }
}