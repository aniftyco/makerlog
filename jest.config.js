module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  setupFiles: ['./tests/setup.js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
};
