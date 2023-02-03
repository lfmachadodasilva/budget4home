module.exports = {
  extends: [
    //'next',
    'turbo',
    'prettier',
    'react-app',
    'react-app/jest'
  ],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    'turbo/no-undeclared-env-vars': 'off'
  }
};
