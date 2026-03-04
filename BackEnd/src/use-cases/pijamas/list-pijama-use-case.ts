import type { Pijama } from "@/@types/prisma/client.js"
import type { PijamasRepository } from "@/repositories/pijamas-repository.js"

interface ListPijamasUseCaseRequest {
    publicId: string
}

type ListPijamasUseCaseResponse = {
    pijamas: Pijama[]
}

export class ListPijamasUseCase {
    constructor (private pijamasRepository: PijamasRepository){}

    async execute ({
    }: ListPijamasUseCaseRequest): Promise<ListPijamasUseCaseResponse>{
        const pijamas = await this.pijamasRepository.list()
        
        return {pijamas}
    }    
}