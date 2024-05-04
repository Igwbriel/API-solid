import { FastifyInstance } from 'fastify'
import { register } from './controller/register-controller'
import { authenticate } from './controller/authenticate-controller'
import { profile } from './controller/profile-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  app.get('/me', profile)
}
