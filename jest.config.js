export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  extensionsToTreatAsEsm: ['.jsx', '.ts', '.tsx'],
  transformIgnorePatterns: ['/node_modules/(?!(@shopify|@remix-run)/)'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
};
