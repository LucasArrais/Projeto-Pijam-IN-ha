import type { FeedbacksRepository } from '@/repositories/feebacks-repository.js'

interface DeleteFeedbackRequest {
  publicId: string
}

export class DeleteFeedbackUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute(request: DeleteFeedbackRequest): Promise<void> {
    const { publicId } = request

    const feedbackExists = await this.feedbacksRepository.findByPublicId(publicId)
    if (!feedbackExists) {
      throw new Error('Feedback not found')
    }

    await this.feedbacksRepository.delete(publicId)
  }
}