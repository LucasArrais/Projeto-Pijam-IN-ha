import { PrismaPijamasRepository } from '@/repositories/prisma/pijamas-prisma-repository.js'
import { GetPijamasByFiltersUseCase } from '@/use-cases/pijamas/get-pijamas-by-filter-use-case.js'

export function makeGetPijamasByFiltersUseCase() {
  const pijamasRepository = new PrismaPijamasRepository()

  return new GetPijamasByFiltersUseCase(pijamasRepository)
}
