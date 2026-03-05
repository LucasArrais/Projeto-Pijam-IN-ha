import { PrismaFeedbacksRepository } from '@/repositories/prisma/feedbacks-prisma-repository.js'
import { CreateFeedbackUseCase } from '@/use-cases/feedbacks/create-feeback.js'

export function makeCreateFeedbackUseCase() {
  const feedbacksRepository = new PrismaFeedbacksRepository()
  const createFeedbackUseCase = new CreateFeedbackUseCase(feedbacksRepository)
  return createFeedbackUseCase
}