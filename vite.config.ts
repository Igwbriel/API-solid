/* eslint-disable prettier/prettier */
import { defineConfig } from 'vitest/config'
import tsconfigpaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigpaths()],
  test: {
    environmentMatchGlobs: [
      ['src/http/controller/**', 'prisma'],
    ]
  }
})


