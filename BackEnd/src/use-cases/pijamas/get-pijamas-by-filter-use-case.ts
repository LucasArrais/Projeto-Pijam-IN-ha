import type { ESTACAO, GENERO, TIPO } from '@/@types/prisma/enums.js'
import type {
  PijamasRepository,
  FindManyByResponse,  
} from '@/repositories/pijamas-repository.js'

interface GetPijamasByFiltersUseCaseRequest {
  season?: ESTACAO
  type?: TIPO
  gender?: GENERO
  page?: number
  limit?: number
}

export class GetPijamasByFiltersUseCase {
  constructor(private pijamasRepository: PijamasRepository) {}

  async execute({
    season,
    type,
    gender,
    page,
    limit,
  }: GetPijamasByFiltersUseCaseRequest): Promise<FindManyByResponse> {  
    const result = await this.pijamasRepository.findManyBy({
      season,
      type,
      gender,
      page,
      limit,
    })

    return result
  }
}