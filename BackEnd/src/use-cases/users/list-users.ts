// src/use-cases/users/list-users-use-case.ts
import type { UsersRepository } from '@/repositories/users-repository.js'
import type { User } from '@/@types/prisma/client.js'

interface ListUsersResponse {
  users: User[]
}

export class ListUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<ListUsersResponse> {
    const users = await this.usersRepository.list()
    return { users }
  }
}