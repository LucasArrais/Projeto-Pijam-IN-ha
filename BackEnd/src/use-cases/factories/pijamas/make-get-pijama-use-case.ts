import { PrismaPijamasRepository } from '@/repositories/prisma/pijamas-prisma-repository.js'
import { GetPijamaUseCase } from '@/use-cases/pijamas/get-pijama-use-case.js'

export function makeGetPijamaUseCase() {
  const pijamasRepository = new PrismaPijamasRepository()
  const getPijamaUseCase = new GetPijamaUseCase(pijamasRepository)

  return getPijamaUseCase
}
