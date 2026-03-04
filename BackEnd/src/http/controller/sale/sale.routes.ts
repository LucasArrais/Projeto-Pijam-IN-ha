import type { FastifyInstance } from "fastify";
import { createSale } from "./create-sale.controller.js";
import { listSales } from "./list-sales.controller.js";
import { deleteSale } from "./delete-sale.controller.js";
import { getSale } from "./get-sale.controller.js";
import { updateSale } from "./update-sale.controller.js";


export async function SaleRoutes(app: FastifyInstance) {
    app.post('/', createSale)
    app.get('/', listSales)
    app.get('/:publicId', getSale)
    app.put('/:publicId', updateSale)
    app.delete('/:publicId', deleteSale)
}