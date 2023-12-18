export default {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/cypress/',
    '/projects/anedomansky/ngx-icon/src/gen/',
  ],
  coverageDirectory: 'coverage/',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/cypress/',
    '/dist/',
    '.html',
  ],
  moduleNameMapper: {
    '@anedomansky/ngx-icon':
      '<rootDir>/dist/anedomansky/ngx-icon/fesm2022/anedomansky-ngx-icon.mjs',
  },
};
