import type { PijamaWithSizes, PijamasRepository } from "@/repositories/pijamas-repository.js"

type ListPijamasUseCaseResponse = {
    pijamas: PijamaWithSizes[]
}

export class ListPijamasUseCase {
    constructor (private pijamasRepository: PijamasRepository){}

    async execute (): Promise<ListPijamasUseCaseResponse>{
        const pijamas = await this.pijamasRepository.list()
        
        return {pijamas}
    }    
}