import type { FastifyInstance } from 'fastify'
import { pijamasRoutes } from './pijamas/pijamas.routes.js'
import { AddressRoutes } from './address/address.routes.js'
import { userRoutes } from './users/user-routes.js'
import { SaleRoutes } from './sale/sale.routes.js'
import { feedbackRoutes } from './feedbacks/feedback.routes.js'

export async function appRoutes(app: FastifyInstance) {
  app.register(pijamasRoutes, { prefix: '/pijamas' })
  app.register(AddressRoutes, { prefix: '/address' })
  app.register(userRoutes, { prefix: '/users' })
  app.register(SaleRoutes, { prefix: '/sale' })
  await app.register(feedbackRoutes, { prefix: '/feedbacks' })
}