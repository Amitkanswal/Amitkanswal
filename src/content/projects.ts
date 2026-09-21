import type { Project } from '@/types/content'

/**
 * Every metric here carries a `source` that is true and public-facing.
 *
 * Figures whose provenance could not be stated were REMOVED rather than published with a
 * vague source — see CONTENT-TODO.md for what came out and how to put it back. Adding a
 * metric tile is the strongest version of a claim, so only add one when you can fill in
 * how it was measured.
 */
export const projects: Project[] = [
  {
    id: 'app-sdk-setdata',
    order: 1,
    name: 'App SDK — setData / setEntryData',
    version: 'v2.4.0',
    tagline:
      'Letting a third-party iframe write into the host CMS without letting it corrupt an entry',
    stack: ['TypeScript', 'postMessage', 'JSON Schema', 'Jest'],
    role: 'Sole owner — design through beta release',
    duration: '2025–2026',
    scale: 'Public npm package · @contentstack/app-sdk · every marketplace app',
    status: 'shipped',
    metrics: [
      {
        label: 'Merged PRs in app-sdk',
        value: '25',
        source: 'GitHub search: repo:contentstack/app-sdk author:Amitkanswal is:merged',
      },
      {
        label: 'Validation layers',
        value: '2',
        source: 'Hard schema + async soft constraint, per PR #181 / #184 (MKT-15625)',
      },
      {
        label: 'Error contract',
        value: 'Field-level',
        source: 'Structured per-field errors, not a thrown exception — see the RFC',
      },
      {
        label: 'Distribution',
        value: 'npm + CDN',
        source: 'unpkg.com/@contentstack/app-sdk@2.4.0, SRI-pinned in the README',
      },
    ],
    tradeoffs: [
      {
        chose: 'two validation layers — hard schema, then async soft constraints',
        over: 'one synchronous validation pass',
        because:
          'some constraints (uniqueness, referential checks) cannot be answered without a ' +
          'round trip. Collapsing both into one synchronous gate would have made every ' +
          'setData call wait on the slowest possible check.',
      },
      {
        chose: 'structured field-level error objects',
        over: 'thrown exceptions with a message string',
        because:
          'the consumer is a third-party developer who cannot read the host codebase. A ' +
          'message string is only debuggable by whoever wrote it.',
      },
      {
        chose: 'non-blocking, event-driven error propagation',
        over: 'rejecting the promise on any soft-constraint failure',
        because:
          'a soft failure should surface without unwinding the caller’s state machine. ' +
          'Predictability mattered more than strictness here.',
      },
    ],
    links: [
      {
        label: 'PR #184 — setData for complex fields & entry (MKT-15625)',
        href: 'https://github.com/contentstack/app-sdk/pull/184',
        kind: 'pr',
      },
      {
        label: 'PR #181 — setData',
        href: 'https://github.com/contentstack/app-sdk/pull/181',
        kind: 'pr',
      },
      {
        label: 'PR #163 — field setData in create-entry page',
        href: 'https://github.com/contentstack/app-sdk/pull/163',
        kind: 'pr',
      },
      { label: 'contentstack/app-sdk', href: 'https://github.com/contentstack/app-sdk', kind: 'repo' },
    ],
  },

  {
    id: 'developer-hub-platform',
    order: 2,
    name: 'Developer Hub & Marketplace platform',
    tagline: 'Micro-frontend host for third-party apps, built on Webpack Module Federation',
    stack: ['React', 'TypeScript', 'Webpack Module Federation', 'Node.js'],
    role: 'Founding engineer',
    duration: '2022–2026',
    scale: 'Host platform for every third-party app surface in the CMS',
    status: 'maintained',
    metrics: [
      {
        label: 'Architecture',
        value: 'Module Federation',
        source: 'Webpack Module Federation host with per-team remotes',
      },
      {
        label: 'Independent deploys',
        value: 'Per team',
        source:
          'Module Federation architecture decouples remote builds from the host release.',
      },
    ],
    tradeoffs: [
      {
        chose: 'Webpack Module Federation',
        over: 'a monolithic host bundle with build-time app registration',
        because:
          'teams needed to ship their own surface without waiting on a host release train. ' +
          'The cost is runtime version skew between host and remotes, which then has to be ' +
          'managed deliberately rather than by the compiler.',
      },
      {
        chose: 'host-level shared dependency loading',
        over: 'letting each remote bundle its own React',
        because:
          'duplicated framework copies dominated cold start. Sharing them trades a little ' +
          'remote independence for startup time — the right trade at this ratio.',
      },
    ],
    links: [
      {
        label: 'Developer Hub docs',
        href: 'https://www.contentstack.com/docs/developers/developer-hub/',
        kind: 'doc',
      },
      {
        label: 'Marketplace platform guides',
        href: 'https://www.contentstack.com/docs/developers/marketplace-platform-guides/',
        kind: 'doc',
      },
    ],
  },

  {
    id: 'secret-remediation',
    order: 3,
    name: 'Org-wide secret remediation',
    tagline: 'Owning the Ecosystem slice of a coordinated secret-scanning cleanup',
    stack: ['Secret scanning', 'Snyk', 'npm audit', 'GitHub Actions', 'SCA'],
    role: 'Owner — Ecosystem scope; co-designed the triage model with the Security team',
    duration: '2026',
    scale: 'Repository estate spanning public, private and archived repos',
    status: 'in-progress',
    metrics: [
      {
        label: 'Repos in scope',
        value: '288+',
        source:
          'Audit scope — repositories whose findings I triage, across public, private and ' +
          'archived. Deliberately not a commit count.',
      },
      {
        label: 'Triage rules',
        value: '8',
        source: 'Read-down decision list, stop at the first true statement',
      },
      {
        label: 'Remediation paths',
        value: '5',
        source: 'Each closure carries a tag naming how it was remediated',
      },
      {
        label: 'Repos hardened in code',
        value: '9+',
        source:
          'Snyk / npm-audit remediation PRs, sca-scan.yml, and SECURITY.md ' +
          'rollout across the starter fleet — all in the public GitHub record',
      },
    ],
    tradeoffs: [
      {
        chose: 'a read-down decision list, stop at the first true statement',
        over: 'per-incident judgement by whoever picks the finding up',
        because:
          'across hundreds of repositories, consistency and auditability beat locally ' +
          'optimal decisions. A list is delegable and reviewable; a judgement call is neither.',
      },
      {
        chose: 'tag before resolve, always',
        over: 'resolve now and annotate later',
        because:
          'a resolution with no recorded reason is indistinguishable from a deletion. ' +
          'The reason is the artifact; the closure is just bookkeeping.',
      },
      {
        chose: 'leave it open when no rule fits',
        over: 'closing on best guess to keep the queue moving',
        because:
          'a false "resolved" is the only unrecoverable state in this process. An open ' +
          'finding is merely unfinished, and queue length is the wrong thing to optimise.',
      },
      {
        chose: 'escalation as assignment',
        over: 'escalation as a comment',
        because: 'assignment creates an owner and a clock. A comment creates neither.',
      },
    ],
    links: [
      {
        label: 'PR #174 — SCA scan workflow',
        href: 'https://github.com/contentstack/app-sdk/pull/174',
        kind: 'pr',
      },
      {
        label: 'PR #89 — Snyk remediation, React starter',
        href: 'https://github.com/contentstack/contentstack-react-starter-app/pull/89',
        kind: 'pr',
      },
      {
        label: 'PR #58 — Snyk fix, ui-extensions-sdk',
        href: 'https://github.com/contentstack/ui-extensions-sdk/pull/58',
        kind: 'pr',
      },
    ],
  },

  {
    id: 'api-proxy',
    order: 4,
    name: 'Secure API proxy for marketplace apps',
    tagline: 'Giving untrusted apps external API access without handing them credentials',
    stack: ['Node.js', 'TypeScript', 'REST'],
    role: 'Designer and implementer',
    duration: '2024–2026',
    scale: 'All marketplace apps making outbound calls',
    status: 'maintained',
    metrics: [
      {
        label: 'Credential exposure',
        value: 'None',
        source:
          'Apps never receive the credential — the proxy holds it and executes on their ' +
          'behalf. An architectural property, not a measurement.',
      },
      {
        label: 'Policy enforcement',
        value: 'Server-side',
        source: 'Validation and execution control live where the app author cannot edit them',
      },
    ],
    tradeoffs: [
      {
        chose: 'a server-side proxy holding credentials',
        over: 'issuing scoped tokens directly to each app',
        because:
          'an app runs in an iframe in the user’s browser. Any token it holds is a token ' +
          'the user can read. The proxy keeps the secret on the server side of the trust boundary.',
      },
      {
        chose: 'validation and execution control at the proxy',
        over: 'trusting app-declared request shapes',
        because:
          'the proxy is the only place in the chain that both knows the policy and cannot ' +
          'be edited by the app author.',
      },
    ],
    links: [
      {
        label: 'PR #1065 — M2M app tokens on personalize scopes (MKT-18817)',
        href: 'https://github.com/contentstack/auth-sidecar-service/pull/1065',
        kind: 'pr',
      },
    ],
  },

  {
    id: 'starter-fleet',
    order: 5,
    name: 'Framework starter fleet & one-click deploy',
    tagline: 'Ten framework starters, each deployable from the CMS in a single click',
    stack: ['Next.js', 'Nuxt', 'Astro', 'SvelteKit', 'Angular', 'Vue', 'Gatsby', 'Stencil'],
    role: 'Owner — built and maintained the fleet',
    duration: '2020–2026',
    scale: 'Public repositories, the default onboarding path for new developers',
    status: 'maintained',
    metrics: [
      {
        label: 'Framework starters',
        value: '10',
        source:
          'React, Next.js SSR, Next.js SSG, Vue, Nuxt, Nuxt3, Angular, SvelteKit, ' +
          'Stencil, Astro, Gatsby — all with merged PRs under your handle',
      },
      {
        label: 'Repos touched',
        value: '~30',
        source:
          'Distinct repositories across 351 merged PRs in org:contentstack, ' +
          'GitHub search, 2026-09-21',
      },
      {
        label: 'Deploy path',
        value: 'One click',
        source: 'Launch / Vercel integration with framework-specific templates',
      },
    ],
    tradeoffs: [
      {
        chose: 'one starter per framework, maintained in parallel',
        over: 'a single generic starter with adapters',
        because:
          'a developer evaluating a CMS wants idiomatic code in their framework, not a ' +
          'lowest-common-denominator abstraction. The cost is ten repos of maintenance — ' +
          'which is why the security and dependency work below shows up across all of them.',
      },
    ],
    links: [
      {
        label: 'contentstack/contentstack-nextjs-starter-app',
        href: 'https://github.com/contentstack/contentstack-nextjs-starter-app',
        kind: 'repo',
      },
      {
        label: 'contentstack/contentstack-astro-starter-app',
        href: 'https://github.com/contentstack/contentstack-astro-starter-app',
        kind: 'repo',
      },
      {
        label: 'contentstack/launch-cli',
        href: 'https://github.com/contentstack/launch-cli',
        kind: 'repo',
      },
    ],
  },

  {
    id: 'marketplace-apps',
    order: 6,
    name: 'Marketplace app catalogue',
    tagline: 'Twenty-plus first-party apps, and the boilerplate everyone else starts from',
    stack: ['React', 'TypeScript', 'Venus UI', 'Playwright'],
    role: 'Built and maintained; author of the shared boilerplate',
    duration: '2022–2026',
    scale: 'Public catalogue — custom fields, dashboards, RTE plugins, DAM integrations',
    status: 'maintained',
    metrics: [
      {
        label: 'First-party apps',
        value: '6 named',
        source:
          'JSON Editor, Table, Colour Picker, Progress Bar, Highlight (RTE) and Brandfolder ' +
          '— each with merged PRs in the public GitHub record',
      },
      {
        label: 'Boilerplate',
        value: 'Org-wide',
        source: 'contentstack/marketplace-app-boilerplate — the documented starting point',
      },
      {
        label: 'E2E coverage',
        value: 'Playwright',
        source: 'PR #110 — "feat: added e2e for ORG App" on the boilerplate',
      },
    ],
    tradeoffs: [
      {
        chose: 'a shared boilerplate with opinionated defaults',
        over: 'documentation plus a blank template',
        because:
          'the defaults are the documentation that people actually read. Anything left to ' +
          'a doc gets re-derived, inconsistently, by every app author.',
      },
    ],
    links: [
      {
        label: 'contentstack/marketplace-app-boilerplate',
        href: 'https://github.com/contentstack/marketplace-app-boilerplate',
        kind: 'repo',
      },
      {
        label: 'contentstack/marketplace-jsoneditor-app',
        href: 'https://github.com/contentstack/marketplace-jsoneditor-app',
        kind: 'repo',
      },
      {
        label: 'contentstack/marketplace-table-app',
        href: 'https://github.com/contentstack/marketplace-table-app',
        kind: 'repo',
      },
    ],
  },

  {
    id: 'smart-work-tracker',
    order: 7,
    name: 'Smart Work Tracker',
    tagline: 'Open-source Chrome MV3 extension for hourly work logging and analytics',
    stack: ['TypeScript', 'React 18', 'Vite', 'CRXJS', 'Dexie', 'Recharts', 'Vitest'],
    role: 'Sole author',
    duration: '2026',
    scale: 'Public repository, MV3, bring-your-own OAuth client',
    status: 'shipped',
    metrics: [
      {
        label: 'Manifest',
        value: 'MV3',
        source: 'manifest.config.ts, Chrome Manifest V3',
      },
      {
        label: 'Storage',
        value: 'Local-first',
        source: 'IndexedDB via Dexie, with an offline queue and optional Sheets sync',
      },
      {
        label: 'Auth model',
        value: 'Per-user',
        source:
          'README — each user supplies their own OAuth client ID; no shared ' +
          'developer credential ships in the extension',
      },
    ],
    tradeoffs: [
      {
        chose: 'local-first storage with an optional sync queue',
        over: 'a hosted backend',
        because:
          'a work tracker that logs your hours is not data I want to be custodian of. ' +
          'Keeping it in the user’s browser removes the entire class of question.',
      },
      {
        chose: 'bring-your-own OAuth client ID',
        over: 'shipping a build-time client secret',
        because:
          'a client ID baked into a public extension is a shared credential in everyone’s ' +
          'browser. Slightly worse onboarding, materially better security posture.',
      },
    ],
    links: [
      {
        label: 'Amitkanswal/smart-work-tracker',
        href: 'https://github.com/Amitkanswal/smart-work-tracker',
        kind: 'repo',
      },
    ],
  },
]
