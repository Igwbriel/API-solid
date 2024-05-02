import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Good feeling',
      description: null,
      phone: null,
      latitude: -6.3817596,
      longitude: -37.3496443,
    })

    await gymsRepository.create({
      title: 'Muscle center',
      description: null,
      phone: null,

      latitude: -6.3817596,
      longitude: -37.3496443,
    })

    const { gyms } = await sut.execute({
      query: 'Good feeling',
      page: 1,
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Good feeling' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Muscle center ${i}`,
        description: null,
        phone: null,
        latitude: -6.3817596,
        longitude: -37.3496443,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Muscle center',
      page: 2,
    })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Muscle center 21' }),
      expect.objectContaining({ title: 'Muscle center 22' }),
    ])
  })
})
