module.exports = {
  // if you're also using typescript
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  // registers babel.config.js with jest
  // transform: {
  //   '^.+\\.js$': 'babel-jest',
  // },
  // explicitly include any node libs using ESM modules
  // transformIgnorePatterns: [
  //   'node_modules/?!(<ESM module here>|<another here>|<etc...>)',
  // ],
  moduleNameMapper: {
    '.scss$': 'identity-obj-proxy',
  },
  // moduleNameMapper: {
  //   '\\.(css|less|scss)$': 'identity-obj-proxy',
  // },
  // transform: {
  //   '^.+\\.js$': 'babel-jest',
  //   '.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css',
  // },
}
