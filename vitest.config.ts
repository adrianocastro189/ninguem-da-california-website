import { defineConfig } from 'vitest/config';

// passWithNoTests keeps `npm run validate` green before the helper tests
// land in F0.5; from then on the real specs under src/lib run normally.
export default defineConfig({
  test: {
    passWithNoTests: true,
  },
});
