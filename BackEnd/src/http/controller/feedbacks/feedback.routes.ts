import { type FastifyInstance } from 'fastify'
import { createFeedbackController } from './create-feedback.controller.js'
import { listFeedbacksController } from './list-feedbacks.controller.js'
import { deleteFeedbackController } from './delete-feedback.controller.js'


export async function feedbackRoutes(app: FastifyInstance) {
  app.post('/', createFeedbackController)
  app.get('/', listFeedbacksController)
  app.delete('/:publicId', deleteFeedbackController)
}