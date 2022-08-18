module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-shadow': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        controlComponents: ['Field', 'input'],
        assert: 'both',
      },
    ],
    // "@typescript-eslint/no-shadow": ["error", , { "ignoreTypeValueShadow": true }]
  },
};
