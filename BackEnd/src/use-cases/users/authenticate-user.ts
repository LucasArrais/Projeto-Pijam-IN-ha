import type { UsersRepository } from '@/repositories/users-repository.js'
import { compare } from 'bcryptjs'
import type { User } from '@/@types/prisma/client.js'

interface AuthenticateRequest {
  email: string
  password: string
}

interface AuthenticateResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: AuthenticateRequest): Promise<AuthenticateResponse> {
    const { email, password } = request

    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    const doesPasswordMatch = await compare(password, user.password)
    if (!doesPasswordMatch) {
      throw new Error('Invalid credentials')
    }

    return { user }
  }
}