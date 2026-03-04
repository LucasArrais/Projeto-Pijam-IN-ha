import type { FastifyInstance } from "fastify";
import { createPijama } from "./create-pijama.controller.js";

export async function pijamasRoutes(app: FastifyInstance) {
    app.post('/', createPijama)
}