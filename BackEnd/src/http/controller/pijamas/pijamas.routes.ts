import type { FastifyInstance } from "fastify";
import { createPijama } from "./create-pijama.controller.js";
import { updatePijama } from "./update-pijama.controller.js";
import { getPijama } from "./get-pijama.controller.js";
import { deletePijama } from "./delete-pijama.controller.js";
import { listPijama } from "./list-pijamas.controller.js";

export async function pijamasRoutes(app: FastifyInstance) {
    app.post('/', createPijama)
    app.get('/:publicId', getPijama)
    app.get('/', listPijama) 
    //ver se não deve ainda criar rotas de leitura para o tipo/genero/estacao
    app.patch('/:publicId', updatePijama)
    app.delete('/:publicId', deletePijama)
}