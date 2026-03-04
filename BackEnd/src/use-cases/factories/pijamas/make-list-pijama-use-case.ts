import { PrismaPijamasRepository } from "@/repositories/prisma/pijamas-prisma-repository.js"
import { ListPijamasUseCase } from "@/use-cases/pijamas/list-pijama-use-case.js"

export function makeListPijamaUseCase() {
    const pijamasRepository = new PrismaPijamasRepository()
    const listPijamaUseCase = new ListPijamasUseCase(pijamasRepository)

    return listPijamaUseCase
}