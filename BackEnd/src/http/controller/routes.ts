import type { FastifyInstance } from "fastify"
import { AddressRoutes } from "./address/address.routes.js"

export async function appRoutes(app:FastifyInstance) {

    app.register(AddressRoutes, { prefix: '/address'})
    //app.register(usersRoutes, { prefix:'/users'}) como exemplo
}