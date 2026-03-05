import type {
  PijamaWithSizes,
  PijamasRepository,
} from '@/repositories/pijamas-repository.js'
import { ESTACAO, GENERO, TAMANHO, TIPO } from '@/@types/prisma/client.js'

interface CreatePijamaUseCaseRequest {
  name: string
  description: string
  image: string
  price: number
  season: ESTACAO
  type: TIPO
  gender: GENERO
  on_sale: boolean
  sale_percent?: number | null
}

type CreatePijamaUseCaseResponse = {
  pijama: PijamaWithSizes
}

export class CreatePijamaUseCase {
  constructor(private pijamasRepository: PijamasRepository) {}

  async execute(
    request: CreatePijamaUseCaseRequest,
  ): Promise<CreatePijamaUseCaseResponse> {
    if (request.on_sale) {
      if (
        !request.sale_percent ||
        request.sale_percent <= 0 ||
        request.sale_percent > 100
      ) {
        throw new Error('Percentual de desconto inválido.')
      }
    } else {
      request.sale_percent = null
    }

    const pijama = await this.pijamasRepository.create({
      ...request,
      pijama_size: {
        create: [
          { size: TAMANHO.PP, stock_quantity: 1 },
          { size: TAMANHO.P, stock_quantity: 1 },
          { size: TAMANHO.M, stock_quantity: 1 },
          { size: TAMANHO.G, stock_quantity: 1 },
          { size: TAMANHO.GG, stock_quantity: 1 },
        ],
      },
    })

    return { pijama }
  }
}
