# Architecture — ninguem-da-california-website

> Language of record: en_US. This document is the source of truth for the
> site's architecture. It is maintained by the Architect and validated by
> the CEO. The companion document `CODING_STANDARDS.md` covers code rules.

## 0. Golden rules (CEO directives)

1. **Pixel-exact port.** The prototype's visual is reproduced pixel for
   pixel. Not one pixel changes because of the technology choice. Any
   later visual change is an explicitly requested adjustment from the CEO,
   never a side effect of the port. Every task inherits this as an
   acceptance criterion.
2. **Quality gates are law.** Code quality is enforced by machine, not by
   human review. A failing gate breaks the build. The standard is set in
   `CODING_STANDARDS.md` and grouped under `npm run validate`.

## 1. What this is

Static, single-page marketing site for the band **Ninguém da Califórnia**
(Juiz de Fora/MG). Hosted on GitHub Pages. No backend, no database. All
content lives in one JSON file the band edits and commits.

## 2. Stack

| Concern        | Choice                                              |
|----------------|-----------------------------------------------------|
| Framework      | **Astro** `5.1.x`, `output: 'static'`               |
| Interactivity  | **Alpine.js** `3.x` (carousels + mobile menu only)  |
| Data           | Single `src/data/site.json`, validated by **Zod**   |
| Styling        | Hand-authored CSS via **design tokens** (no literals)|
| Hosting        | GitHub Pages via GitHub Actions                     |
| Language       | pt_BR only (no i18n)                                 |

Pinned, mirroring the sister project `dont-step-wrong-website`:
`astro@5.1.x`, `alpinejs@3.x`, `@types/alpinejs@3.x`. Node `>=20`.

The prototype's `dc-runtime` (React loaded from a CDN at runtime, client
-side template interpretation) is **rejected for production**. We port the
design faithfully into Astro components; only the rendering engine changes.

## 3. The prototype and the decoupling rule

The design is delivered under `.prototype/` as a Claude Design Component
(`Site.dc.html` + `support.js` + `site-config.js`).

- `.prototype/` is **reference-only**. It is never imported by the build,
  never bundled, and lives outside `src/`.
- **Deleting `.prototype/` must not break `npm run build`.** Hard
  invariant. (Learned from the proletarias dashboard: the prototype is
  staging; production is the ported source.)
- The dev **ports** markup/CSS from the prototype into `.astro` components
  and `tokens.css`. From that point, `src/` is the source of truth.

### Prototype → Astro translation

| Prototype (dc-runtime)       | Astro                              |
|------------------------------|------------------------------------|
| `{{ expr }}`                 | `{expr}` (build-time)              |
| `<sc-for list as>`          | `{items.map(...)}`                 |
| `<sc-if value>`             | `{cond && ...}`                    |
| `DCLogic.renderVals()` logic | pure helpers in `src/lib/`         |
| `window.SITE_CONFIG` (.js)   | `src/data/site.json` (validated)   |
| React state (carousels/menu) | Alpine.js `x-data`                 |

## 4. The single central JSON (the "database")

All band content lives in **one file: `src/data/site.json`**. It must stay
a single, whole JSON — content is **never** split across multiple files.

Top-level keys (mirroring the prototype's `site-config.js`):
`email`, `socials` (`youtube`, `instagram`), `featuredVideo`, `history`,
`members[]` (`name`, `role`, `photo`), `gallery[]` (`src`, `caption`),
`shorts[]` (YouTube url/id), `shows[]` (`date`, `city`, `venue`, `time`,
`ticket`), `repertoire[]` (`title`, `artist`, `link`).

- The file is loaded and validated at build by a **Zod schema** in
  `src/data/site.ts`. A malformed file **fails the build** with a clear
  error. Empty/optional states (empty photo, "link em breve", empty
  agenda) are part of the schema contract because the prototype renders
  those empty states.
- Derived logic from `DCLogic.renderVals()` moves to build-time helpers:
  - `src/lib/youtube.ts` — `ytId(input)`, `embedUrl(id)` (nocookie embed).
  - `src/lib/format.ts` — date label (`2026-08-15` → `15 AGO`), zero-pad,
    member rotation angles, derived counters.
- These helpers are pure functions and are unit-tested (see §7).

**Editing workflow:** edit `site.json` → commit/push → GitHub Action
rebuilds and deploys. No component files are touched.

### Images

YouTube videos are links (their player). All **images are served by the
site** (logos, gallery photos, polaroid member photos) and live under
`public/img/`. `site.json` references them by relative path (e.g.
`img/banda-ao-vivo.jpg`); components resolve them against
`import.meta.env.BASE_URL` so they work under the project-pages base path.

## 5. Structure

```
src/
├── components/
│   ├── layout/    BaseLayout, Nav, MobileMenu, Footer
│   ├── ui/        SectionHeading (shared, extracted to satisfy jscpd)
│   └── sections/  Hero, FeaturedVideo, History, Members, Gallery,
│                  Shorts, Repertoire, Agenda, Contact
├── data/          site.json (single source), site.ts (Zod loader)
├── lib/           youtube.ts, format.ts (pure, unit-tested)
├── pages/         index.astro, privacidade.astro
└── styles/        tokens.css, global.css   (the ONLY css files in src)
public/
├── img/           band photos, gallery images
└── assets/        logo-white.png, logo-black.png, favicon
.prototype/        reference only — never bundled
```

One section = one component. The repeated section header (`// 0N — TITLE`
+ `<h2>`) is extracted into `components/ui/SectionHeading.astro` so jscpd
(threshold 0) stays green.

## 6. Styling — tokens only

The CEO selected the strict CSS regime. Therefore:

- **All styling is hand-authored CSS that references design tokens.** No
  raw literals (hex colors, px/rem lengths, shadows) in components.
- **`src/styles/tokens.css` is the single source of every design value**
  extracted from the prototype: the palette (`#0a0a0c`, `#b026ff`,
  `#e8e8e8`, …), the three fonts (Anton, Oswald, VT323), spacing, font
  sizes, shadows, and the VHS keyframes.
- The only `.css` files allowed under `src/` are `tokens.css` and
  `global.css`. A guard script (`scripts/check-css-allowlist.mjs`) fails
  the build if any other `.css` appears under `src/`.
- Component styles live in scoped `<style>` blocks inside `.astro` files
  and use only `var(--token)`. **stylelint** forbids raw hex and raw
  length units in those blocks, forcing tokenization.
- Tokens are a refactor of *storage*, not of *appearance*. Token values
  equal the prototype values exactly (golden rule §0.1).

## 7. Testing

No broad unit-test mandate and no coverage gate (CEO decision: this is a
simple static site). The **only** tests are for the two pure helpers,
where real logic with edge cases lives:

- `src/lib/youtube.test.ts` — id extraction from full URL, `youtu.be`,
  `shorts/`, `embed/`, bare id, and empty/garbage input.
- `src/lib/format.test.ts` — date label formatting, zero-padding.

Run by `vitest run`. These are part of `validate` but without a coverage
threshold.

## 8. Quality toolchain (`npm run validate`)

Adapted from the proletarias dashboard. Any failure breaks the build.

| Step          | Command                                  | Guarantees                         |
|---------------|------------------------------------------|------------------------------------|
| typecheck     | `astro check` / `tsc --noEmit`           | TS strict, no `any`                |
| lint          | `eslint .`                               | code style, import hygiene         |
| css guard     | `node scripts/check-css-allowlist.mjs`   | only tokens.css/global.css in src  |
| lint:css      | `stylelint "src/**/*.{css,astro}"`       | no raw hex/length; tokens only     |
| jscpd         | `jscpd src` (threshold 0)                | zero copy-paste                    |
| format:check  | `prettier --check .`                     | single formatting                  |
| test          | `vitest run`                             | helper logic correct (no coverage) |
| build         | `astro build`                            | catches asset/alias regressions    |

`husky` + `lint-staged` run the relevant gates on staged files pre-commit.
Commits follow Conventional Commits. Never bypass hooks (`--no-verify`).

## 9. Hosting / deploy

- GitHub Pages serving Astro's static `dist/`, via a GitHub Actions
  workflow on push to `main` (mirrors `dont-step-wrong-website`'s
  `.github/workflows/deploy.yml`).
- **Until the domain exists**, the site is served from the project-pages
  base path `/ninguem-da-california-website/`; `astro.config.mjs` sets
  `base` and `site` accordingly. When the domain is pointed, `base`
  returns to root (one-line change) and a `CNAME` is added. Domain +
  Cloudflare DNS are owned by DevOps and deferred until the band validates
  the live site.

## 10. SEO (lightweight)

Not a content driver, but not neglected: `<title>`/description, Open Graph
tags, favicon from the logo, and a JSON-LD `MusicGroup` schema (band name,
members, social URLs). Single page → no sitemap complexity.

## 11. Privacy page

A standalone route `src/pages/privacidade.astro` (not on the home page,
linked from the footer), anticipating Cloudflare Web Analytics. Adapted
from `dont-step-wrong-website`'s privacy page, in pt_BR.
