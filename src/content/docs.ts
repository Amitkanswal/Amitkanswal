import type { Doc } from '@/types/content'

/**
 * The docs/ writing section was removed. Only the ways-of-working entry remains.
 *
 * If you later want the writing section back, add entries here and matching VFS entries
 * in lib/vfs.ts — nothing else needs to change. Real writing (an RFC, a post-mortem, a
 * design note) is the highest-leverage thing you could add to this site later.
 */
export const docs: Doc[] = [
  {
    path: '.github/workflows/ci.yml',
    title: 'Ways of working',
    kind: 'config',
    date: '2026-09-21',
    summary: 'Engineering practices, rendered as the pipeline they effectively are',
    relatedProjects: [],
    body: `# Practices I actually hold to, written as the config they effectively are.
# Every step here is something an interviewer can ask me to describe breaking.

\`\`\`yaml
name: how-i-work

on:
  push:
    branches: [main]

jobs:
  design:
    steps:
      - name: Write the contract before the implementation
        run: |
          If the error shape is not decided, the feature is not designed.
          Consumers integrate against the failure path as much as the happy one.

      - name: Name the alternative you rejected
        run: |
          A decision with no rejected option is a preference.
          Every design I argue for names a credible path not taken, and why.

  review:
    steps:
      - name: Review more than you merge
        run: |
          284 reviews against 351 authored merges. On a platform team that ratio
          is the job, not overhead around it.

      - name: Move the rule out of review as soon as it is stable
        run: |
          A convention enforced by a human is a bottleneck.
          Once it stops being contested, it belongs in lint, types or boilerplate.

  ship:
    steps:
      - name: Measure the path the user is on
        run: |
          The worst cold start I inherited was duplicated frameworks, not slow code.
          Profile the real path before optimising the convenient one.

      - name: Leave the starting point better than the docs
        run: |
          Whatever is left to a guide gets re-derived differently by every team.
          Whatever is in the boilerplate gets adopted by default.

  secure:
    steps:
      - name: Never close a finding without recording why
        run: |
          An untagged resolution is indistinguishable from a deletion.
          The reason is the artifact; the closure is just bookkeeping.

      - name: When no rule fits, leave it open
        run: |
          Across a large repository estate the only unrecoverable mistake is
          closing something that was never fully investigated.
\`\`\`

> If any line here stops being true, it should come off the page rather than stay as
> aspiration.`,
  },
]
