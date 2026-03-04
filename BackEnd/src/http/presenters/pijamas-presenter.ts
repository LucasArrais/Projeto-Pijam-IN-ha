import type { Prisma } from "@/@types/prisma/client.js"
import { TAMANHO, type ESTACAO, type GENERO, type TIPO } from "@/@types/prisma/enums.js"

type PijamaWithPijamaSizes = Prisma.PijamaGetPayload<{
    include: { pijama_size: true }
  }>

type HTTPPijama = {
    id: string
    name: string
    description: string
    image: string
    price: number
    season: ESTACAO
    type: TIPO 
    gender: GENERO 
    on_sale: boolean 
    sale_percent: number
    pijama_sizes: {
        size: TAMANHO,
        stock_quantity: number
    } []
}

export class PijamaPresenter {
    static toHTTP(pijama: PijamaWithPijamaSizes): HTTPPijama
    static toHTTP(pijamas: PijamaWithPijamaSizes[]): HTTPPijama[]
    static toHTTP(input: PijamaWithPijamaSizes | PijamaWithPijamaSizes[]): HTTPPijama | HTTPPijama[] {
        if(Array.isArray(input)){
            return input.map((pijama)=> this.toHTTP(pijama))
        }

        return{
            id: input.publicId,
            name: input.name,
            description: input.description,
            image: input.image,
            price: input.price,
            season: input.season,
            type: input.type, 
            gender:  input.gender,
            on_sale:  input.on_sale,
            sale_percent: input.sale_percent ?? 0,
            pijama_sizes: input.pijama_size.map((pijama_sizes)=>({
                size: pijama_sizes.size,
                stock_quantity: pijama_sizes.stock_quantity
            }) )
        }
    }
}