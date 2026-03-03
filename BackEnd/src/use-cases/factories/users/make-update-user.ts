import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { UpdateUserUseCase } from '../../users/update-user.js'

export function makeUpdateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const updateUserUseCase = new UpdateUserUseCase(usersRepository)
  return updateUserUseCase
}