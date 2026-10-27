import js from '@eslint/js';
import globals from 'globals';

// Limit this follow-up's lint gate to the changed source and its review tools;
// untouched interior pages remain outside the requested editing scope.
export default [
  {
    files: ['src/Home.jsx', 'src/components.jsx', 'src/ConsultationForm.jsx', 'src/HeroGallery.jsx', 'src/ProductGallery.jsx', 'src/businessConfig.js'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', parserOptions: { ecmaFeatures: { jsx: true } }, globals: globals.browser },
    rules: { ...js.configs.recommended.rules, 'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_', ignoreRestSiblings: true }] },
  },
  {
    files: ['tools/quotation.test.mjs', 'tools/check-refinement.mjs', 'tools/refinement-baseline.mjs'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: { ...globals.node, ...globals.browser } },
    rules: js.configs.recommended.rules,
  },
];
