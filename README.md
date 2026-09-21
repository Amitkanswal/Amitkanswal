# Portfolio — IDE shell

An editor-metaphor portfolio: the file tree is the navigation, each "file" is a
content category, and the terminal footer is the ten-second version for someone
who reads nothing else.

React 19 · Vite 7 · TypeScript · Tailwind 4.

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run build      # -> dist/
```

---

## The one thing to understand

**There are two file trees in this project and they are not the same tree.**

| | Where | What it is |
|---|---|---|
| Real | the repo you are reading | actual source on disk |
| Virtual | `src/lib/vfs.ts` | the site's navigation — content categories rendered as files |

Changing the site's navigation means editing `src/lib/vfs.ts`, not moving files
around on disk.

---

## Where to put your content

Everything you say about yourself lives in `src/content/`. Nothing in
`src/components/` hardcodes a fact about you — you should be able to replace
`src/content/` wholesale and still have a working site.

| File | Holds | Appears as |
|---|---|---|
| `profile.ts` | name, title, availability, positioning claim | `src/README.md` header |
| `narrative.ts` | the engineering narrative, "now investigating" | `src/README.md` body |
| `projects.ts` | case studies — metrics, trade-offs, incidents | `src/projects.tsx` |
| `principles.ts` | decision heuristics, wired to project ids | `src/architecture.rs` |
| `career.ts` | roles, promotions, education, awards | `src/career.json` |
| `skills.ts` | capability groups | `src/skills.toml` |
| `telemetry.ts` | the always-visible numbers panel | sidebar, always visible |
| `contact.ts` | how to reach you | `contact.sh` |
| `docs.ts` | RFCs, post-mortems, ways-of-working | `docs/*`, `.github/workflows/ci.yml` |
| `quickFacts.ts` | the terminal JSON dump | terminal footer |

Search the repo for `TODO` — every placeholder is marked.

### Adding a new category

1. Add an entry to `VFS` in `src/lib/vfs.ts`.
2. Make sure its `kind` maps to a pane in `src/components/panes/index.ts`.
3. Add the content module. That's it — the tree, tabs, palette and outline all
   pick it up automatically.

---

## Two fields you should not delete

`Metric.source` and `Telemetry.sourcedFrom` exist to keep the site honest. Both
are rendered in the UI.

The rule they enforce: **if you cannot say how a number was measured, the number
does not go on the page.** An unverifiable figure costs far more in an interview
than a missing one, and this is the single most common way portfolios lose
credibility.

The same applies to `Principle.appliedIn` — a principle with no project behind it
reads as a platitude. Wired to a case study, it reads as a track record.

---

## Before you launch

### Pre-rendering — do not skip this

This is a client-rendered app, so crawlers and link-preview bots currently see an
empty page. **Your site will not rank for your name until this is fixed.**

Add a pre-render step that walks `VFS` and emits static HTML per route —
`vite-plugin-ssg`, `react-dom/server` in a small build script, or move to Astro.
Until then, the fallback content in `index.html` is all a bot sees.

### Checklist

- [ ] Replace every `TODO` in `src/content/` and `index.html`
- [ ] Drop your real `resume.pdf` into `public/` (delete the placeholder)
- [ ] Add `public/og-image.png` at 1200×630
- [ ] Add `public/avatar.webp`
- [ ] Set `base` in `vite.config.ts` — `'/'` for a user site, `'/<repo>/'` for a project site
- [ ] Set the canonical URL, OG URLs and JSON-LD `sameAs` links in `index.html`
- [ ] Add `public/sitemap.xml` and update `robots.txt`
- [ ] Wire analytics in `src/lib/analytics.ts` (Plausible / Umami / GoatCounter)
- [ ] Pre-render (above)
- [ ] Run axe DevTools and fix anything it flags
- [ ] Test at 375px, 768px and 1440px
- [ ] Custom domain — `yourname.dev` beats a `github.io` subdomain on every signal

---

## Design constraints already handled

Worth knowing so you don't undo them:

- **Colours are validated, not chosen by eye.** The four series colours are
  adjacent-pair CVD-separated (ΔE 8.4) and all clear 3:1 against the surface. If
  you change them, re-validate rather than eyeballing.
- **Identity is never colour alone.** Every meter slice is direct-labelled; every
  status callout pairs its colour with an icon and a word.
- **The file tree has real tree semantics** — `role="tree"`, `role="treeitem"`,
  arrow-key navigation. A fake file tree a screen reader cannot parse is worse
  than a plain list.
- **Dark mode is a selected theme**, not an inverted light one, and is applied
  before first paint so there is no flash.
- **Progressive disclosure via native `<details>`** — works without JS, keyboard
  accessible for free.
- **Mobile has a real fallback.** The IDE metaphor has no phone equivalent, so
  below `md` the sidebar becomes a drawer. A large share of recruiter traffic is
  phone-first.
- **`prefers-reduced-motion` is respected**, including the terminal caret.

## Keyboard

| Key | Does |
|---|---|
| `⌘K` / `Ctrl+K` | command palette |
| `⌘P` / `Ctrl+P` | same |
| `⌘B` / `Ctrl+B` | toggle explorer |
| `↑` `↓` | move within the file tree |
| `Esc` | close the palette |
