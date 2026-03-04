import type { Sale } from "@/@types/prisma/client.js"

export interface SaleRepository {
    create(data: any): Promise<Sale>
    findByPublicId(publicId: string): Promise<Sale | null>
    list(page?: number, limit?: number): Promise<Sale[]>
    update(publicId: string, data: any): Promise<Sale>
    delete(publicId: string): Promise<void>
}