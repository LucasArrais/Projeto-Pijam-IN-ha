import { PrismaPijamasRepository } from "@/repositories/prisma/pijamas-prisma-repository.js";
import { DeletePijamaUseCase } from "@/use-cases/pijamas/delete-pijama-use-case.js";


export function makeDeletePostUseCase(){
    const pijamasRepository = new PrismaPijamasRepository()
    const deletePijamaUseCase = new DeletePijamaUseCase(pijamasRepository)

    return deletePijamaUseCase
}