import { FastifyInstance } from 'fastify'
import { register } from './controller/register-controller'
import { authenticate } from './controller/authenticate-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
}
