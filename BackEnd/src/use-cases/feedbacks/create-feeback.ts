import type { Feedback } from '@/@types/prisma/browser.js'
import type { FeedbacksRepository } from '@/repositories/feebacks-repository.js'

interface CreateFeedbackRequest {
  nome: string
  descricao: string
  avaliacao: number
}

interface CreateFeedbackResponse {
  feedback: Feedback
}

export class CreateFeedbackUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute(request: CreateFeedbackRequest): Promise<CreateFeedbackResponse> {
    const { nome, descricao, avaliacao } = request

    if (avaliacao < 0 || avaliacao > 5) {
      throw new Error('Avaliação deve ser entre 0 e 5')
    }

    const feedback = await this.feedbacksRepository.create({
      nome,
      descricao,
      avaliacao
    })

    return { feedback }
  }
}