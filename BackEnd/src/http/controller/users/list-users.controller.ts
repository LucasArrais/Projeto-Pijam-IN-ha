import { type FastifyRequest, type FastifyReply } from 'fastify'
import { makeListUsersUseCase } from '@/use-cases/factories/users/make-list-users.js'

export async function listUsersController(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const listUsersUseCase = makeListUsersUseCase()
    const { users } = await listUsersUseCase.execute()
    const usersWithoutPassword = users.map(user => {
      const { password: _, ...userWithoutPassword } = user
      return userWithoutPassword
    })
    return reply.status(200).send(usersWithoutPassword)
  } catch (error: any) {
    return reply.status(400).send({ message: error.message })
  }
}