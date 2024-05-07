/* eslint-disable prettier/prettier */
import { Environment } from 'vitest'

const environment: Environment = {
  name: 'prisma',
  async setup() {
    console.log('Setup')

    return {
      async teardown() {
        console.log('Teardown')
      },
    }
  },
  transformMode: 'web'
}

export default environment;
