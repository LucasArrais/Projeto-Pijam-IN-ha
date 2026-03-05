import { PrismaPijamasRepository } from '@/repositories/prisma/pijamas-prisma-repository.js'
import { CreatePijamaUseCase } from '@/use-cases/pijamas/create-pijama-use-case.js'

export function makeCreatePijamaUseCase() {
  const pijamasRepository = new PrismaPijamasRepository()
  
  const createPijamaUseCase = new CreatePijamaUseCase(pijamasRepository)

  return createPijamaUseCase
}
