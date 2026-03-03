import { type FastifyInstance } from 'fastify'
import { createUserController } from './create-user.controller.js'
import { listUsersController } from './list-users.controller.js'
import { updateUserController } from './update-user.controller.js'
import { verifyJwt } from '@/http/middlewares/verify-jwt.js'
import { authenticateController } from './authenticate-user.controller.js'
import { deleteUserController } from './delete-user.controller.js'

export async function userRoutes(app: FastifyInstance) {
  app.post('/', createUserController)
  app.get('/', listUsersController)
  app.post('/sessions', authenticateController)
  
  app.put('/:publicId', {
    preHandler: verifyJwt,
    handler: updateUserController
  })
  app.delete('/:publicId', {
    preHandler: verifyJwt,
    handler: deleteUserController
  })
}