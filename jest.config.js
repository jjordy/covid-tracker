module.exports = {
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/config/**",
    "!**/types/**",
    "!**/graphql/__generated__.tsx",
    "!jest.config.js",
    "!**/cypress/**",
  ],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/cypress/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
  },
  transformIgnorePatterns: ["/node_modules/", "^.+\\.module\\.(css|sass|scss)$"],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^pages/(.*)$": "<rootDir/pages/$1",
    "^pages": "<rootDir>/pages/index.tsx",
    "^hooks/(.*)$": "<rootDir>/hooks/$1",
    "^utils": "<rootDir>/utils/index.ts",
    "^utils/(.*)$": "<rootDir>/utils/$1",
    "^shared/(.*)$": "<rootDir>/shared/$1",
  },
};
