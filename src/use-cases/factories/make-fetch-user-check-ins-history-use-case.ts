import { FetchUserCheckInsHistory } from '../fetch-user-check-ins-history'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const useCase = new FetchUserCheckInsHistory(checkInsRepository)

  return useCase
}
