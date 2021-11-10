/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: ["html", "lcov", ["text", {
    "skipFull": true
  }]],
  collectCoverage: true,
  verbose: true,
  transform: {
    "^.+\\.tsx?$": 'ts-jest'
  },
  moduleNameMapper: {
    '^@wwwr/(.*)$': '<rootDir>/packages/$1/src',
    globals: {
      'ts-jest': {
        diagnostics: {
          // Do not fail on TS compilation errors
          // https://kulshekhar.github.io/ts-jest/user/config/diagnostics#do-not-fail-on-first-error
          warnOnly: true
        },
      },
    },
  },
};