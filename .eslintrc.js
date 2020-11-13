module.exports = {
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['prettier', 'react', 'react-native-globals'],
  env: {
    'react-native-globals/all': true,
    jest: true,
  },
  overrides: [
    {
      files: ['**/__tests__/*.js'],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': ['error', { ignore: ['navigation'] }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
