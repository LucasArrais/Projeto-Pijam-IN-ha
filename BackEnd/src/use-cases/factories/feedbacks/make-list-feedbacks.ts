import { PrismaFeedbacksRepository } from '@/repositories/prisma/feedbacks-prisma-repository.js'
import { ListFeedbacksUseCase } from '@/use-cases/feedbacks/list-feedbacks.js'

export function makeListFeedbacksUseCase() {
  const feedbacksRepository = new PrismaFeedbacksRepository()
  const listFeedbacksUseCase = new ListFeedbacksUseCase(feedbacksRepository)
  return listFeedbacksUseCase
}