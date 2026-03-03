// src/http/controller/users/update-user-controller.ts
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateUserUseCase } from '@/use-cases/factories/users/make-update-user.js'

export async function updateUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    publicId: z.string().uuid()
  })

  const updateUserBodySchema = z.object({
    name: z.string().min(3).optional(),
    username: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional()
  })

  const paramsResult = paramsSchema.safeParse(request.params)
  if (!paramsResult.success) {
    return reply.status(400).send({
      message: 'Invalid publicId format'
    })
  }

  const bodyResult = updateUserBodySchema.safeParse(request.body)
  if (!bodyResult.success) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: bodyResult.error.format()
    })
  }

  const { publicId } = paramsResult.data
  const { name, username, email, password } = bodyResult.data

  const userIdFromToken = request.user.sub

  if (userIdFromToken !== publicId) {
    return reply.status(403).send({ message: 'You can only update your own user' })
  }

  try {
    const updateUserUseCase = makeUpdateUserUseCase()
    const { user } = await updateUserUseCase.execute({
      publicId,
      name: name ?? undefined,
      username: username ?? undefined,
      email: email ?? undefined,
      password: password ?? undefined
    })

    const { password: _, ...userWithoutPassword } = user
    return reply.status(200).send(userWithoutPassword)
  } catch (error: any) {
    if (error.message === 'User not found') {
      return reply.status(404).send({ message: 'Usuário não encontrado' })
    }
    if (error.message === 'Email already exists') {
      return reply.status(409).send({ message: 'Email já está em uso' })
    }
    if (error.message === 'Username already exists') {
      return reply.status(409).send({ message: 'Username já está em uso' })
    }
    return reply.status(400).send({ message: error.message })
  }
}