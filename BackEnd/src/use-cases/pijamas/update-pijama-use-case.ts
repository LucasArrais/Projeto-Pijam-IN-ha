import type {
  PijamaWithSizes,
  PijamasRepository,
} from '@/repositories/pijamas-repository.js'
import { ESTACAO, GENERO, TIPO } from '@/@types/prisma/client.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface UpdatePijamaUseCaseRequest {
  publicId: string
  name?: string
  description?: string
  image?: string
  price?: number
  season?: ESTACAO
  type?: TIPO
  gender?: GENERO
  on_sale?: boolean
  sale_percent?: number | null
}

type UpdatePijamaUseCaseResponse = {
  pijama: PijamaWithSizes
}

export class UpdatePijamaUseCase {
  constructor(private pijamasRepository: PijamasRepository) {}

  async execute(
    request: UpdatePijamaUseCaseRequest,
  ): Promise<UpdatePijamaUseCaseResponse> {
    const { publicId, ...data } = request

    const pijamaToUpdate = await this.pijamasRepository.findBy({ publicId })

    if (!pijamaToUpdate) {
      throw new ResourceNotFoundError()
    }

    const pijama = await this.pijamasRepository.update(pijamaToUpdate.id, data)

    return { pijama }
  }
}
