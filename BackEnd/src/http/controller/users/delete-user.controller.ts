// src/http/controller/users/delete-user-controller.ts
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeDeleteUserUseCase } from '@/use-cases/factories/users/make-delete-user.js'

export async function deleteUserController(
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
  const userIdFromToken = request.user.sub

  if (userIdFromToken !== publicId) {
    return reply.status(403).send({ message: 'You can only delete your own user' })
  }

  try {
    const deleteUserUseCase = makeDeleteUserUseCase()
    await deleteUserUseCase.execute({ publicId })

    return reply.status(204).send()
  } catch (error: any) {
    if (error.message === 'User not found') {
      return reply.status(404).send({ message: 'Usuário não encontrado' })
    }
    return reply.status(400).send({ message: error.message })
  }
}