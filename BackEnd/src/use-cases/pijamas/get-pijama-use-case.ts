import type { Pijama } from "@/@types/prisma/client.js"
import type { PijamasRepository } from "@/repositories/pijamas-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

interface GetPijamaUseCaseRequest {
    publicId: string
}

type GetPijamaUseCaseResponse = {
    pijama: Pijama
}

export class GetPijamaUseCase {
    constructor (private pijamasRepository: PijamasRepository){}

    async execute ({
        publicId
    }: GetPijamaUseCaseRequest): Promise<GetPijamaUseCaseResponse>{
        const pijama = await this.pijamasRepository.findBy({publicId})
        
        if(!pijama){
            throw new ResourceNotFoundError()
        }
        
        return {pijama}
    }

    
}