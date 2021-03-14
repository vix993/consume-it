module.exports = {
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
  },
  testMatch: [
    "**/*.(test|spec).(ts|tsx)"
  ],
  globals: {
    "ts-jest": {
      useBabelrc: true,
      tsConfigFile: "jest.tsconfig.json"
    }
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
  ],
  coverageReporters: [
    "json",
    "lcov",
    "text",
    "text-summary"
  ],
};