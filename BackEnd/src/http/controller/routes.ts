import type { FastifyInstance } from "fastify"
import { SaleRoutes } from "./sale/sale.routes.js"

export async function appRoutes(app:FastifyInstance) {

    app.register(SaleRoutes, { prefix: '/sale'})
}