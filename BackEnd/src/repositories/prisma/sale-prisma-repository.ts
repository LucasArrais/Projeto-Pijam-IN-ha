import { prisma } from "@/libs/prisma.js"
import type { SaleRepository } from "../sale-prisma.js"

export class PrismaSaleRepository implements SaleRepository { 
    async create(data: any) {
        const { items, ...saleData } = data
        
        const totalPrice = items.reduce((sum: number, item: any) => {
            return sum + (item.price * item.quantity)
        }, 0)

        const sale = await prisma.sale.create({
            data: {
                ...saleData,
                price: totalPrice,
                sale_Pijama: {
                    create: items.map((item: any) => ({
                        quantity: item.quantity,
                        price: item.price,
                        pijama: {
                            connect: { id: item.pijamaId }
                        }
                    }))
                }
            },
            include: {
                address: true,
                sale_Pijama: {
                    include: {
                        pijama: true
                    }
                }
            }
        })

        return sale
    }

    async findByPublicId(publicId: string) {
        const sale = await prisma.sale.findUnique({
            where: { publicId },
            include: {
                address: true,
                sale_Pijama: {
                    include: {
                        pijama: true
                    }
                }
            }
        })
        return sale
    }

    async list(page = 1, limit = 10) {
        const skip = (page - 1) * limit
        const sales = await prisma.sale.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                address: true,
                sale_Pijama: {
                    include: {
                        pijama: true
                    }
                }
            }
        })
        return sales
    }

    async update(publicId: string, data: any) {
        const sale = await prisma.sale.update({
            where: { publicId },
            data,
            include: {
                address: true,
                sale_Pijama: {
                    include: {
                        pijama: true
                    }
                }
            }
        })
        return sale
    }

    async delete(publicId: string) {
        const sale = await prisma.sale.findUnique({
            where: { publicId },
            include: {
                sale_Pijama: true,
                address: {
                    include: { sale: true }
                }
            }
        })

        if (!sale) throw new Error('Sale not found')

        await prisma.$transaction(async (tx) => {
            await tx.salePijama.deleteMany({
                where: { saleId: sale.id }
            })

            await tx.sale.delete({
                where: { id: sale.id }
            })

            if (sale.address) {
                const addressWithSales = await tx.address.findUnique({
                    where: { id: sale.address.id },
                    include: { sale: true }
                })
                
                if (addressWithSales && !addressWithSales.sale) {
                    await tx.address.delete({
                        where: { id: sale.address.id }
                    })
                }
            }
        })
    }
}