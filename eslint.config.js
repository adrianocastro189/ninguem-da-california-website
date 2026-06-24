import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  js.configs.recommended,
  ...astro.configs.recommended,
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  // .prototype/ is reference-only and never bundled (ARCHITECTURE.md §3).
  { ignores: ['dist/', '.astro/', 'node_modules/', '.prototype/'] },
];
