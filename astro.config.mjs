import { defineConfig } from 'astro/config';

// Project-pages base path until the custom domain is pointed (DevOps owns
// that switch). When the domain exists, `base` returns to '/' and `site`
// changes to the real URL — one-line change. See ARCHITECTURE.md §9.
export default defineConfig({
  site: 'https://ninguemdacalifornia.com.br',
  base: '/',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
});
