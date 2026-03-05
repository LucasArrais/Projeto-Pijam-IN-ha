import type { UsersRepository } from '@/repositories/users-repository.js'
import { hash } from 'bcryptjs'
import type { User } from '@/@types/prisma/client.js'

interface UpdateUserRequest {
  publicId: string
  name?: string | undefined
  username?: string | undefined
  email?: string | undefined
  password?: string | undefined
}

interface UpdateUserResponse {
  user: User
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const { publicId, name, username, email, password } = request

    const userExists = await this.usersRepository.findByPublicId(publicId)
    if (!userExists) {
      throw new Error('User not found')
    }

    if (email && email !== userExists.email) {
      const userWithSameEmail = await this.usersRepository.findByEmail(email)
      if (userWithSameEmail) {
        throw new Error('Email already exists')
      }
    }

    if (username && username !== userExists.username) {
      const userWithSameUsername = await this.usersRepository.findByUsername(username)
      if (userWithSameUsername) {
        throw new Error('Username already exists')
      }
    }

    const data: any = {}
    if (name !== undefined) data.name = name
    if (username !== undefined) data.username = username
    if (email !== undefined) data.email = email
    if (password !== undefined) data.password = await hash(password, 12)

    const user = await this.usersRepository.update(publicId, data)

    return { user }
  }
}