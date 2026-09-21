# Pushing this to amitkanswal.github.io

Your current site stays live until you deliberately merge. These commands put the new
version on a branch and open a PR.

## 1. Push to a branch

From inside this unzipped folder:

```bash
git init
git add .
git commit -m "feat: IDE-themed portfolio rebuild"
git remote add origin https://github.com/Amitkanswal/Amitkanswal.github.io.git
git fetch origin
git checkout -b redesign
git push -u origin redesign
```

`git fetch` first, then a new branch — this never touches `main`, so the live site is
untouched.

Open the PR: https://github.com/Amitkanswal/Amitkanswal.github.io/compare/main...redesign

## 2. Switch Pages to GitHub Actions — REQUIRED

Your repo currently serves a single hand-written `index.html` straight from `main`. A Vite
app cannot deploy that way, so nothing will work until you change this:

**Settings → Pages → Build and deployment → Source → GitHub Actions**

That is the whole change. `.github/workflows/deploy.yml` does the rest on every push to
`main`. Nothing is published from a branch, so flipping this now is safe — your current
`index.html` keeps serving until the first Actions deploy runs.

## 3. Preview before you merge

Branch pushes will not deploy. To see it running:

```bash
npm install
npm run build && npm run preview
```

Or merge to `main` and watch the Actions run — the old site is one `git revert` away if
you want it back.

## 4. Merge

Merging `redesign` into `main` triggers `deploy.yml`, which builds and publishes. First
run takes about two minutes.

---

## Before you merge — worth doing

- [ ] Drop your real `resume.pdf` into `public/` (delete `RESUME-PLACEHOLDER.txt`)
- [ ] Add `public/og-image.png` at 1200×630 — this is what shows when your link is
      pasted into Slack or LinkedIn
- [ ] Add `public/avatar.webp`, or the header falls back to your initials
- [ ] Work through `CONTENT-TODO.md` — the metrics removed before publishing
- [ ] Re-read `src/content/profile.ts`: I changed your positioning line, and that is the
      first thing anyone reads

## Known limitation

The site is client-rendered, so crawlers and link-preview bots currently see an empty
page. **It will not rank for your name until a pre-render step is added** — see
README § Pre-rendering. Everything else works; this one is worth doing before you start
sending the link out.

## Base path

`vite.config.ts` has `base: '/'`, which is correct for a user site at
`https://amitkanswal.github.io/`. Only change it if you move the site into a project repo.
