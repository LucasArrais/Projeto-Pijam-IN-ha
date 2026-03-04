import type { Pijama } from "@/@types/prisma/client.js"
import type { ESTACAO, GENERO, TIPO } from "@/@types/prisma/enums.js"


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
}

export class PijamaPresenter {
    static toHTTP(pijama: Pijama): HTTPPijama
    static toHTTP(pijamas: Pijama[]): HTTPPijama[]
    static toHTTP(input: Pijama | Pijama[]): HTTPPijama | HTTPPijama[] {
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
        }
    }
}