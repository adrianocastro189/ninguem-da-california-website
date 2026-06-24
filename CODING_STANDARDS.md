# Coding Standards — ninguem-da-california-website

> Language of record: en_US. Validated by the CEO. Every developer follows
> this to the letter. A rule that can be linted IS linted; a failing gate
> breaks the build. See `ARCHITECTURE.md` §8 for the gate list.

## 1. Language

- All code, comments, identifiers, file names, commit messages: **en_US**.
- **pt_BR only** in user-facing strings (site copy) and in `site.json`
  content. The audience is Brazilian; the UI is Portuguese.

## 2. Styling — the strict regime

- **No raw design literals in components.** No hex colors, no px/rem
  lengths, no raw shadows in `.astro` `<style>` blocks. Use `var(--token)`.
- Every design value comes from `src/styles/tokens.css`. If a value is
  missing, **add a token** — never inline a literal.
- The only `.css` files allowed under `src/` are `tokens.css` and
  `global.css`. Anything else fails `check-css-allowlist.mjs`.
- Token values must equal the prototype's values exactly. Tokenizing is a
  storage refactor, not a visual change (Golden Rule, ARCHITECTURE §0.1).

## 3. Components

- One section = one component. Keep components small and single-purpose.
- Extract repeated markup into a shared component rather than duplicating
  (jscpd threshold 0 enforces this — e.g. `SectionHeading`).
- Typed props (TypeScript interfaces in the component frontmatter). No
  `any`. Prefer explicit contracts over loose objects.
- No fetching, no runtime data loading. All data is read from
  `site.json` at build time via the `src/data/site.ts` loader.

## 4. Data and helpers

- `site.json` is the single content source. Never split it.
- All derived/computed logic lives in pure helpers under `src/lib/`,
  not inline in templates. Helpers are pure (no side effects), typed, and
  unit-tested.
- Empty/optional states are handled explicitly (empty photo, missing link,
  empty agenda) — they are part of the data contract, not an afterthought.

## 5. Ordering and documentation

- Methods/exported functions ordered **alphabetically** within a module.
- Every exported function has a short doc comment stating its contract.
- No dead code, no commented-out blocks, no `console.log` in committed code.

## 6. Interactivity

- Alpine.js only for the three stateful pieces: gallery carousel, shorts
  carousel, mobile menu. Declarative `x-data`/`x-on`. No imperative DOM
  scripting beyond what Alpine needs.

## 7. Tests

- The only tests are for `src/lib/youtube.ts` and `src/lib/format.ts`.
- Cover the real edge cases (URL variants, bare id, empty input, date
  formatting). No coverage threshold; value over ceremony.

## 8. Git and process

- **Conventional Commits** (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`,
  `test:`). Scope optional (e.g. `feat(gallery): ...`).
- Never bypass hooks (`--no-verify`) or quality gates.
- **Anti-improvise clause:** any divergence between a delegated plan and
  the real code is a BLOCKER. Stop and report to the Architect. Do not
  invent paths, contracts, or token names.
