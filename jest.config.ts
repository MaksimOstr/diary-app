import { getJestProjects } from '@nx/jest';

export default {
  projects: getJestProjects(),
  moduleNameMapper: {
    '@diary-app/shared': '<rootDir>/libs/web/shared/src/index.ts',
    'globalShared': '<rootDir>/libs/global/src/index.ts',
    uuid: require.resolve('uuid'),
  },
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest', // My config from before
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }], // Added by Nx under the migration
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom", "./jest.setup.ts"],
  setupFiles: ['./jest.polyfills.js'],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  
};




