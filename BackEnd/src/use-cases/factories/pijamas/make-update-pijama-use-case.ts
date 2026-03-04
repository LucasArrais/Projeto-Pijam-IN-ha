import { PrismaPijamasRepository } from "@/repositories/prisma/pijamas-prisma-repository.js";
import { UpdatePijamaUseCase } from "@/use-cases/pijamas/update-pijama-use-case.js";

export function makeUpdatePijamaUseCase() {
    const pijamasRepository = new PrismaPijamasRepository()
    const updatePijamaUseCase = new UpdatePijamaUseCase(pijamasRepository)

    return updatePijamaUseCase
}