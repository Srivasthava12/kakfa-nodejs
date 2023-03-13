module.exports = {
    env: {
      es2021: true,
      node: true,
    },
    extends: [
      'airbnb-base',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    ignorePatterns: ['**/dist/*', '**/node_modules/*'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: '2021',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
      'prettier/prettier': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['**/tests/**', '**/test/**'] },
      ],
      'no-console': ['error', { allow: ['time', 'timeEnd'] }],
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'no-return-await': 'off',
      'no-restricted-exports': 'off',
      'no-param-reassign': 'off',
      'no-use-before-define': 'off',
      'import/prefer-default-export': 'off',
    },
  };
  