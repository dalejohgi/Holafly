module.exports = {
  testEnvironment: 'node',
  verbose: true,
  testPathIgnorePatterns: ['<rootDir>/(lib|build|docs|node_modules|coverage)/'],
  coveragePathIgnorePatterns: [
    '<rootDir>/(node_modules|src/(config|models|utils))/',
    '<rootDir>/(index|jest.config).js',
  ],
  collectCoverage: true,
  //coverageReporters: ['lcov'],
};