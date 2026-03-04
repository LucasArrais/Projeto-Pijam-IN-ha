import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateFeedbackUseCase } from '@/use-cases/factories/feedbacks/make-create-feedback.js'

export async function createFeedbackController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createFeedbackBodySchema = z.object({
    nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    descricao: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
    avaliacao: z.number().min(0).max(5, 'Avaliação deve ser entre 0 e 5')
  })

  const result = createFeedbackBodySchema.safeParse(request.body)

  if (!result.success) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: result.error.format()
    })
  }

  const { nome, descricao, avaliacao } = result.data

  try {
    const createFeedbackUseCase = makeCreateFeedbackUseCase()
    const { feedback } = await createFeedbackUseCase.execute({
      nome,
      descricao,
      avaliacao
    })

    return reply.status(201).send(feedback)
  } catch (error: any) {
    return reply.status(400).send({ message: error.message })
  }
}