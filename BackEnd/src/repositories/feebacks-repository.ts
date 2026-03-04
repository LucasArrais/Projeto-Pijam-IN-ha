import type { Prisma, Feedback } from "@/@types/prisma/client.js";

export interface FeedbacksRepository {
    create(data: Prisma.FeedbackCreateInput): Promise<Feedback>
    findByPublicId(publicId: string): Promise<Feedback | null>
    list(rating?: number): Promise<Feedback[]>
    delete(publicId: string): Promise<void>
}