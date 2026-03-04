import type { PijamasRepository } from "@/repositories/pijamas-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";


interface DeletePijamaUseCaseRequest {
    publicId: string
}

export class DeletePijamaUseCase {
    constructor (private pijamasRepository: PijamasRepository) {}

    async execute ({
        publicId
    }: DeletePijamaUseCaseRequest){

        const pijamaToDelete = await this.pijamasRepository.findBy({publicId})

        if(!pijamaToDelete){
            throw new ResourceNotFoundError()
        }

        await this.pijamasRepository.delete(pijamaToDelete.id)
    }
}