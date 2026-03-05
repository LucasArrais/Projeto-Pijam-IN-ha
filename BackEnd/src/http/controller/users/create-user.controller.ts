import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateUserUseCase } from '@/use-cases/factories/users/make-create-user.js'
import { z } from 'zod'

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createUserBodySchema = z.object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    username: z.string().min(3, 'Username deve ter pelo menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
  })

  const result = createUserBodySchema.safeParse(request.body)

  if (!result.success) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: result.error.format()
    })
  }

  const { name, username, email, password } = result.data

  try {
    const createUserUseCase = makeCreateUserUseCase()
    const { user } = await createUserUseCase.execute({
      name,
      username,
      email,
      password
    })
    const { password: _, ...userWithoutPassword } = user

    return reply.status(201).send(userWithoutPassword)
  } catch (error: any) {
    if (error.message === 'Email already exists') {
      return reply.status(409).send({ message: 'Email já está em uso' })
    }
    
    if (error.message === 'Username already exists') {
      return reply.status(409).send({ message: 'Username já está em uso' })
    }
    return reply.status(400).send({ message: error.message })
  }
}