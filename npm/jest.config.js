const { defaults } = require('jest-config');
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
  transform: {
    ...tsjPreset.transform,
  },
  preset: 'ts-jest',
  rootDir: 'tests',
  testRegex: '.test.ts$',
  reporters: ['default'],
  collectCoverageFrom: ['**/*.test.{js}', '!**/node_modules/**', '!**/tools/**', '!**/build/**', '!**/docs/**'],
};
