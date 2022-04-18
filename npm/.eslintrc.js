const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:import/errors', 'plugin:import/warnings', 'plugin:import/typescript', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '**/*.js',
    '**/*.test.*',
    'examples',
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'import/no-unresolved': OFF,
    'max-len': [
      ERROR,
      {
        code: 180,
      },
    ],
    'object-curly-spacing': OFF,
    indent: WARN,
    'no-trailing-spaces': WARN,
    semi: WARN,
    'no-tabs': WARN,
    'comma-dangle': OFF,
    'comma-spacing': WARN,
    indent: [OFF, 4],
    'spaced-comment': WARN,
    'valid-jsdoc': OFF,
    'arrow-parens': OFF,
    'no-mixed-spaces-and-tabs': WARN,
    'linebreak-style': OFF
  },
};
