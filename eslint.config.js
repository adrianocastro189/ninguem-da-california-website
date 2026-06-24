import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  // typescript-eslint provides the TS parser used both for .ts files and for
  // the TypeScript frontmatter of .astro components (CODING_STANDARDS §3
  // mandates typed props). Without it eslint falls back to espree and chokes
  // on `interface`.
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  // .prototype/ is reference-only and never bundled (ARCHITECTURE.md §3).
  { ignores: ['dist/', '.astro/', 'node_modules/', '.prototype/'] },
];
