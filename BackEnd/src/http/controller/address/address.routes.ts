import type { FastifyInstance } from "fastify";
import { createAddress } from "./create.controller.js";

export async function AddressRoutes(app: FastifyInstance) {

    app.post('/create', createAddress)
}