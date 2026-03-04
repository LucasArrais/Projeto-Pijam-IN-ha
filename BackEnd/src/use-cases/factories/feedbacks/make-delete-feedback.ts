import { PrismaFeedbacksRepository } from '@/repositories/prisma/feedbacks-prisma-repository.js'
import { DeleteFeedbackUseCase } from '@/use-cases/feedbacks/delete-feedback.js'

export function makeDeleteFeedbackUseCase() {
  const feedbacksRepository = new PrismaFeedbacksRepository()
  const deleteFeedbackUseCase = new DeleteFeedbackUseCase(feedbacksRepository)
  return deleteFeedbackUseCase
}