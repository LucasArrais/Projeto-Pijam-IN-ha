import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { CreateUserUseCase } from '../../users/create-user.js'

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const createUserUseCase = new CreateUserUseCase(usersRepository)
  return createUserUseCase
}