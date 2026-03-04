import type { FastifyInstance } from "fastify";
import { createPijama } from "./create-pijama.controller.js";
import { updatePijama } from "./update-pijama.controller.js";
import { getPijama } from "./get-pijama.controller.js";

export async function pijamasRoutes(app: FastifyInstance) {
    app.post('/', createPijama)
    app.patch('/:publicId', updatePijama)
    app.get('/:publicId', getPijama)
}