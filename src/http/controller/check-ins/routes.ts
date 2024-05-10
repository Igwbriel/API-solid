import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { history } from './history-controller'
import { metrics } from './metrics-controller'
import { create } from './create-controller'
import { validate } from './validate-controller'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', validate)
}
