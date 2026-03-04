import type { FastifyInstance } from "fastify"
import { pijamasRoutes } from "./pijamas/pijamas.routes.js"

export async function appRoutes(app:FastifyInstance) {
    app.register(pijamasRoutes, { prefix:'/pijamas'})
}