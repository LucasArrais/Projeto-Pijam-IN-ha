// src/repositories/prisma/prisma-feedbacks-repository.ts
import { prisma } from '@/libs/prisma.js'
import type { Prisma, Feedback } from "@/@types/prisma/client.js";
import type { FeedbacksRepository } from '../feebacks-repository.js';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create(data: Prisma.FeedbackCreateInput): Promise<Feedback> {
    const feedback = await prisma.feedback.create({
      data
    })
    return feedback
  }

  async findByPublicId(publicId: string): Promise<Feedback | null> {
    const feedback = await prisma.feedback.findUnique({
      where: { publicId }
    })
    return feedback
  }

  async list(rating?: number): Promise<Feedback[]> {
    const where = rating ? {
      avaliacao: {
        gte: rating
      }
    } : {}

    const feedbacks = await prisma.feedback.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })
    return feedbacks
  }

  async delete(publicId: string): Promise<void> {
    await prisma.feedback.delete({
      where: { publicId }
    })
  }
}