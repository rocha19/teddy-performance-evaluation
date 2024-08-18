module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.e2e-spec.ts"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/.idea/",
    "/.git/",
    "/.cache/",
    "/temp/",
    "/coverage/",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@test/(.*)$": "<rootDir>/test/$1",
  },
  testTimeout: 60000,
  watchPathIgnorePatterns: ["/node_modules/", "/dist/", "/temp/"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
