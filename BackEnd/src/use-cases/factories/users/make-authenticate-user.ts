import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { AuthenticateUseCase } from '../../users/authenticate-user.js'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)
  return authenticateUseCase
}