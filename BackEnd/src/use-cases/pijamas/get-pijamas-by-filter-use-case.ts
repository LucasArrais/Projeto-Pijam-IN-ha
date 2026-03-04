import type { ESTACAO, GENERO, TIPO } from "@/@types/prisma/enums.js";
import type { PijamaWithSizes, PijamasRepository } from "@/repositories/pijamas-repository.js";

interface GetPijamasByFiltersUseCaseRequest{
    season?: ESTACAO
    type?: TIPO
    gender?: GENERO
}

type GetPijamasByFiltersUseCaseResponse = {
    pijamas: PijamaWithSizes[]
}

export class GetPijamasByFiltersUseCase {
    constructor(private pijamasRepository: PijamasRepository) {}

    async execute({
        season,
        type,
        gender
    }: GetPijamasByFiltersUseCaseRequest): Promise<GetPijamasByFiltersUseCaseResponse> {

        const pijamas = await this.pijamasRepository.findManyBy({
            season,
            type,
            gender
        })

        return { pijamas }
    }
}