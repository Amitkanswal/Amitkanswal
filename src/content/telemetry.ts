import type { Telemetry } from '@/types/content'

/**
 * TWO DIFFERENT KINDS OF NUMBER LIVE HERE. Keep them distinguishable.
 *
 *   PRs and reviews  — GitHub API, 2026-09-21. Reproducible: the query is in `note`.
 *   Repository count — audit scope from the secret-remediation programme, NOT commits.
 *
 * That distinction is load-bearing. "288+ repositories contributed to" collapses the
 * moment someone asks to see a commit in one of them; "288+ repositories in scope" is
 * true, wider in span than any commit count, and survives the follow-up question.
 * The `sourcedFrom` line says so in the UI. Do not blur it.
 */
export const telemetry: Telemetry = {
  stats: [
    {
      label: 'PRs involved',
      value: '785',
      note: 'org:contentstack involves:Amitkanswal — authored, reviewed, assigned or discussed',
    },
    {
      label: 'Reviews given',
      value: '284',
      note: 'org:contentstack reviewed-by:Amitkanswal',
    },
    {
      label: 'Repos in scope',
      value: '288+',
      note: 'code + security audit scope, incl. private and archived',
    },
    {
      label: 'Years shipping',
      value: '6+',
      note: 'Jan 2020 – present',
    },
  ],

  // Public / private / archived breakdown. EMPTY = the meter does not render.
  // Fill this from your remediation tracker (percentages summing to 100) and the
  // "Repos by access" meter appears in the sidebar automatically. I removed the
  // placeholder numbers rather than publish a split I had invented.
  repoSplit: [],

  // Estimated from repository primary languages, not a byte count. The word "estimated"
  // stays in sourcedFrom below for exactly that reason.
  languageSplit: [
    { name: 'TypeScript', percent: 58 },
    { name: 'JavaScript', percent: 22 },
    { name: 'HTML / CSS', percent: 12 },
    { name: 'Other', percent: 8 },
  ],

  sourcedFrom:
    'PRs and reviews: GitHub API, 2026-09-21. Repo count: security audit scope, not ' +
    'commit count. Language split estimated from repo primary languages.',
}
