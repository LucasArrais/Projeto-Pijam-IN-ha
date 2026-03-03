import type { Prisma, User } from "@/@types/prisma/client.js";

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findByEmail(email: string): Promise<User | null> 
    findByUsername(username: string): Promise<User | null>
    findByPublicId(publicId: string): Promise<User | null>
    findById(id: number): Promise<User | null>
    list(): Promise<User[]>
    update(publicId: string, data: Prisma.UserUpdateInput): Promise<User>
    delete(publicId: string): Promise<void>
}