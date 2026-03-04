import type { FastifyInstance } from "fastify"
import { feedbackRoutes } from './feedbacks/feedback.routes.js'

export async function appRoutes(app: FastifyInstance) {
    await app.register(feedbackRoutes, { prefix: '/feedbacks' })
}