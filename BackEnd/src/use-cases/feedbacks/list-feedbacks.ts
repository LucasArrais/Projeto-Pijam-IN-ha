import type { Feedback } from '@/@types/prisma/browser.js'
import type { FeedbacksRepository } from '@/repositories/feebacks-repository.js'

interface ListFeedbacksRequest {
  rating?: number | undefined
}

interface ListFeedbacksResponse {
  feedbacks: Feedback[]
}

export class ListFeedbacksUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute(request: ListFeedbacksRequest): Promise<ListFeedbacksResponse> {
    const { rating } = request
    const feedbacks = await this.feedbacksRepository.list(rating)
    return { feedbacks }
  }
}