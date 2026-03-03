import type { FastifyInstance } from "fastify";
import { createAddress } from "./create.controller.js";
import { updateAddress } from "./update.controller.js";

export async function AddressRoutes(app: FastifyInstance) {

    app.post('/create', createAddress)
    app.patch('/update/:publicId', updateAddress)
}