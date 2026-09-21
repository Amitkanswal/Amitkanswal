import type { Career } from '@/types/content'

export const career: Career = {
  entries: [
    {
      org: 'Contentstack',
      title: 'Senior Software Engineer — Developer Platforms / DevX',
      start: 'Feb 2023',
      end: 'present',
      location: 'Pune, India',
      promotions: [
        { to: 'Application Engineer', year: '2020' },
        { to: 'Software Engineer II', year: '2022' },
        { to: 'Senior Software Engineer', year: '2023' },
      ],
      highlights: [
        'Founding engineer on the Developer Hub and Marketplace platform.',
        'Architected the micro-frontend host on Webpack Module Federation, enabling independent per-team deploys.',
        'Cut application startup from 13s to 150ms by deduplicating shared dependencies and moving loading to the host.',
        'Owned setData / setEntryData end to end: postMessage protocol, dual-layer validation, field-level error contracts.',
        'Designed the secure API proxy that lets marketplace apps call external services without ever holding the credential.',
        'Built the one-click deployment integration and the framework starter templates behind it.',
        'Led cross-team architecture discussions on API contracts, validation strategy and failure handling.',
        'Own the Ecosystem scope of an org-wide secret-remediation programme — triage model, tagging discipline and escalation paths across a 288+ repository estate.',
        'Drove dependency and SCA remediation across the public repository fleet: Snyk and npm-audit fixes, scan workflows, SECURITY.md rollout.',
      ],
    },
    {
      org: 'Contentstack',
      title: 'Software Engineer II',
      start: 'Feb 2022',
      end: 'Feb 2023',
      location: 'Mumbai, India',
      promotions: [],
      highlights: [
        'Built and shipped 20+ marketplace integrations — YouTube, Vimeo, Cloudinary, Jira, Brightcove and others.',
        'Built the internal developer tools other teams debug with: JSON Editor and Dev Tools.',
        'Ran internal sessions on React performance, TypeScript and Playwright testing.',
        'Mentored junior engineers and set review standards that outlasted the role.',
      ],
    },
    {
      org: 'Contentstack',
      title: 'Application Engineer',
      start: 'Jan 2020',
      end: 'Feb 2022',
      location: 'Mumbai, India',
      promotions: [],
      highlights: [
        'Built a Chrome extension for jumping from a live page straight to the CMS entry behind it — reached 160+ daily active users.',
        'Implemented multi-stack and field-level navigation for content editing workflows.',
        'Wrote 10+ framework integration examples that became the developer onboarding path.',
      ],
    },
  ],

  education: [
    {
      institution: 'Mumbai University',
      degree: 'B.E. — Electronics & Telecommunications',
      year: '2015 – 2019',
      honors: [],
    },
  ],

  awards: [
    {
      title: 'Runner-up, Contentstack Hackathon',
      org: 'Contentstack',
      year: '',
      note: 'The App SDK prototype from this was later productized.',
    },
    {
      title: 'Above & Beyond Award (4×)',
      org: 'Contentstack',
      year: '',
    },
  ],

  mentoring:
    'Mentor junior engineers on the platform team; run internal sessions on React ' +
    'performance, TypeScript and Playwright.',
}
