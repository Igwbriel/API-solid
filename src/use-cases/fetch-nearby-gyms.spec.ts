import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Featch nearby gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Far gym',
      description: null,
      phone: null,
      latitude: -6.458325,
      longitude: -37.097045,
    })

    await gymsRepository.create({
      title: 'Near gym',
      description: null,
      phone: null,

      latitude: -6.3817596,
      longitude: -37.3496443,
    })

    const { gyms } = await sut.execute({
      userLatitude: -6.379647,
      userLongitude: -37.349671,
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near gym' })])
  })
})
