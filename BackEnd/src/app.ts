import fastify from 'fastify'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import { env } from '@/env/index.js'
import cors from '@fastify/cors'
import { appRoutes } from './http/controller/routes.js'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET as string,
})

app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
})

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issue: error,
    })
  }

  if (error instanceof SyntaxError) {
    return reply.status(400).send({
      message: 'O corpo da requisição não está em formato JSON válido. Verifique as informações.',
    })
  }

  return reply.status(500).send({ message: 'Internal server error' })
})