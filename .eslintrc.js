module.exports = {
  extends: [
    'expo', // Your existing Expo config
    'prettier', // Disable ESLint rules conflicting with Prettier
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error', // Enforce Prettier as ESLint rule
    'react/react-in-jsx-scope': 'off', // React 19: No need for import React
  },
};
