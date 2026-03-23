import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

/** 🏛️ KGBI - Professional ESLint Configuration
 * Ensures high code quality and React 19 standards.
 */
export default [
  { ignores: ['dist', 'node_modules', 'public'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // 🚀 THE FIX: Precise rules for unused variables
      'no-unused-vars': ['warn', { 
        'varsIgnorePattern': '^[A-Z_]', 
        'argsIgnorePattern': '^_' ,
        'caughtErrorsIgnorePattern': /^_/u.source
      }],
      // 🏺 ADDED: Best-of-the-best security & quality rules
      'no-console': 'warn', // Keeps production logs clean
      'react-hooks/exhaustive-deps': 'warn', // Crucial for your scrolling/timer effects
    },
  },
]
