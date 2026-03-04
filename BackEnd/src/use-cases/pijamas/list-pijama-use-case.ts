import type { Pijama } from "@/@types/prisma/client.js"
import type { PijamasRepository } from "@/repositories/pijamas-repository.js"

type ListPijamasUseCaseResponse = {
    pijamas: Pijama[]
}

export class ListPijamasUseCase {
    constructor (private pijamasRepository: PijamasRepository){}

    async execute (): Promise<ListPijamasUseCaseResponse>{
        const pijamas = await this.pijamasRepository.list()
        
        return {pijamas}
    }    
}