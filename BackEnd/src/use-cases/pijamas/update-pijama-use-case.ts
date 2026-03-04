import type {
  PijamaWithSizes,
  PijamasRepository,
} from '@/repositories/pijamas-repository.js'
import { ESTACAO, GENERO, TAMANHO, TIPO } from '@/@types/prisma/client.js'
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
  pijama_sizes?: {
    size: TAMANHO
    stock_quantity: number
  }[]
}

type UpdatePijamaUseCaseResponse = {
  pijama: PijamaWithSizes
}

export class UpdatePijamaUseCase {
  constructor(private pijamasRepository: PijamasRepository) {}

  async execute(
    request: UpdatePijamaUseCaseRequest,
  ): Promise<UpdatePijamaUseCaseResponse> {
    const { publicId, pijama_sizes, ...data } = request

    const pijamaToUpdate = await this.pijamasRepository.findBy({ publicId })

    if (!pijamaToUpdate) {
      throw new ResourceNotFoundError()
    }

    const updateData: any = {
      ...data,
    }
  
    if (pijama_sizes && pijama_sizes.length > 0) {
      updateData.pijama_size = {
        updateMany: pijama_sizes.map((pijama_size) => ({
          where: { size: pijama_size.size},
          data: {stock_quantity: pijama_size.stock_quantity},
        })),
      }
    }
  
    const pijama = await this.pijamasRepository.update(
      pijamaToUpdate.id,
      updateData,
    )
  

    return { pijama }
  }
}
