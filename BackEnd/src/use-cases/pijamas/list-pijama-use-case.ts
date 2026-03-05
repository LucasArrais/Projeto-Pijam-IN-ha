import type {
  PijamaWithSizes,
  PijamasRepository,
} from '@/repositories/pijamas-repository.js'

interface ListPijamasUseCaseRequest {
  name?: string
  page?: number
  limit?: number
}
type ListPijamasUseCaseResponse = {
  pijamas: PijamaWithSizes[]
  totalCount: number
  totalPages: number
  currentPage: number
} 

export class ListPijamasUseCase {
  constructor(private pijamasRepository: PijamasRepository) {}

  async execute({
    name,
    page,
    limit,
  }: ListPijamasUseCaseRequest): Promise<ListPijamasUseCaseResponse> {
    const {
      data: pijamas,
      totalCount,
      totalPages,
      currentPage,
    } = await this.pijamasRepository.list({ name, page, limit })

    return { pijamas, totalCount, totalPages, currentPage }
  }
}
