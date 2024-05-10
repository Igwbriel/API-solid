import fastify from 'fastify'
import { usersRoutes } from './http/controller/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import { fastifyJwt } from '@fastify/jwt'
import { gymsRoutes } from './http/controller/gyms/routes'
import { checkInRoutes } from './http/controller/check-ins/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
