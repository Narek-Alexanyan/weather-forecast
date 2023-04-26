/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "vue/multi-word-component-names": 0
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
}
