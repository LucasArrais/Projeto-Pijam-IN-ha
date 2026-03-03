import { prisma } from '@/libs/prisma.js'
import type { Prisma, User } from "@/@types/prisma/client.js";
import type { UsersRepository } from '@/repositories/users-repository.js';

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data: {
        ...data,
        role: 'DEFAULT'
      }
    })
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    return user
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { username }
    })
    return user
  }

  async findByPublicId(publicId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { publicId: publicId }
    })
    return user
  }

  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id }
    })
    return user
  }

  async list(): Promise<User[]> {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return users
  }

  async update(publicId: string, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await prisma.user.update({
      where: { publicId },
      data
    })
    return user
  }

  async delete(publicId: string): Promise<void> {
    await prisma.user.delete({
      where: { publicId }
    })
  }
}