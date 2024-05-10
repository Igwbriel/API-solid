import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Bem estar fitness',
        description: 'good feelings',
        phone: '11999999999',
        latitude: -6.458325,
        longitude: -37.097045,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Muscle center',
        description: 'good feelings',
        phone: '11999999999',
        latitude: -6.3817596,
        longitude: -37.3496443,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -6.458325,
        longitude: -37.097045,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Bem estar fitness',
      }),
    ])
  })
})
