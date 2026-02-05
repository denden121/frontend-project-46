import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    plugins: { 'import': importPlugin, '@stylistic': stylistic },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node },
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/brace-style': ['error', 'stroustrup'],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
      '@stylistic/quote-props': ['error', 'consistent'],
    },
  },
  {
    files: ['__tests__/**/*.js', '**/*.test.js'],
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
    },
  },
  {
    ignores: ['node_modules/', 'coverage/'],
  },
]
