import type { FastifyInstance } from "fastify";
import { createPijama } from "./create-pijama.controller.js";
import { updatePijama } from "./update-pijama.controller.js";
import { getPijama } from "./get-pijama.controller.js";
import { deletePijama } from "./delete-pijama.controller.js";
import { listPijama } from "./list-pijamas.controller.js";
import { getPijamasByFilters } from "./get-pijama-by-filters.controller.js";

export async function pijamasRoutes(app: FastifyInstance) {
    app.post('/', createPijama)
    app.get('/:publicId', getPijama)
    app.get('/', listPijama) 
    
    app.patch('/:publicId', updatePijama)
    app.delete('/:publicId', deletePijama)

    app.get('/filter', getPijamasByFilters)
}

//se quiserem usar o filter, fazer: /pijamas/filter?gender=MASCULINO ou 
// /pijamas/filter?type=... ou /pijamas/filter?season=...