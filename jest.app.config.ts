import baseConfig from './jest.config';

export default {
  ...baseConfig,
  roots: ['<rootDir>/projects/ngx-icon-app/src'],
  modulePathIgnorePatterns: ['<rootDir>/projects/anedomansky/ngx-icon'],
};
