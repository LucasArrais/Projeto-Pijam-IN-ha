// src/use-cases/users/create-user-use-case.ts
import type { UsersRepository } from '@/repositories/users-repository.js'
import { hash } from 'bcryptjs'
import type { User } from '@/@types/prisma/client.js'

interface CreateUserRequest {
  name: string
  username: string
  email: string
  password: string
}

interface CreateUserResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { name, username, email, password } = request

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new Error('Email already exists')
    }

    const userWithSameUsername = await this.usersRepository.findByUsername(username)
    if (userWithSameUsername) {
      throw new Error('Username already exists')
    }

    const passwordHash = await hash(password, 12)

    const user = await this.usersRepository.create({
      name,
      username,
      email,
      password: passwordHash
    })

    return { user }
  }
}