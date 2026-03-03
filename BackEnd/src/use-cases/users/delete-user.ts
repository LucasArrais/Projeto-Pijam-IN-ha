import type { UsersRepository } from '@/repositories/users-repository.js'

interface DeleteUserRequest {
  publicId: string
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: DeleteUserRequest): Promise<void> {
    const { publicId } = request

    const userExists = await this.usersRepository.findByPublicId(publicId)
    if (!userExists) {
      throw new Error('User not found')
    }

    await this.usersRepository.delete(publicId)
  }
}