import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUseCase } from '@/use-cases/factories/users/make-authenticate-user.js'

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const result = authenticateBodySchema.safeParse(request.body)

  if (!result.success) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: result.error.format()
    })
  }

  const { email, password } = result.data

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    const { user } = await authenticateUseCase.execute({
      email,
      password
    })

    const token = await reply.jwtSign({
      sub: user.publicId,
      role: user.role
    })

    const { password: _, ...userWithoutPassword } = user

    return reply.status(200).send({
      user: userWithoutPassword,
      token
    })
  } catch (error: any) {
    if (error.message === 'Invalid credentials') {
      return reply.status(401).send({ message: 'Email ou senha inválidos' })
    }
    return reply.status(400).send({ message: error.message })
  }
}