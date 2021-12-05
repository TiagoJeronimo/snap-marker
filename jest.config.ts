import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  moduleNameMapper: {
    '.scss$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['./src/setupTests.ts'],
}

export default config
