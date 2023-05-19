// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules'],
  // TODO: separate client/server tests and specify jest-environment-jsdom for client...
  testEnvironment: 'node', 
  preset: 'ts-jest',
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {//the content you'd placed at "global"
      tsconfig: './tsconfig.test.json'
    }]
  },
}

module.exports = customJestConfig