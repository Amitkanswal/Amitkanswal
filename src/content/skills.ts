import type { SkillGroup } from '@/types/content'

/**
 * Rule: nothing here you would not survive a thirty-minute conversation on.
 *
 * I marked depth conservatively from your PR history and resumes. Where I was unsure I
 * used 'working' rather than 'core' — raise anything I underrated, and DELETE anything
 * you would not want to be interviewed on.
 */
export const skills: SkillGroup[] = [
  {
    category: 'Languages',
    icon: '<>',
    items: [
      { name: 'TypeScript', depth: 'core' },
      { name: 'JavaScript', depth: 'core' },
      { name: 'CSS', depth: 'working' },
    ],
  },
  {
    category: 'Platform & SDK',
    icon: '▣',
    items: [
      { name: 'SDK design', depth: 'core' },
      { name: 'Micro-frontends', depth: 'core' },
      { name: 'Module Federation', depth: 'core' },
      { name: 'postMessage protocols', depth: 'core' },
      { name: 'API contract design', depth: 'core' },
      { name: 'Schema validation', depth: 'core' },
    ],
  },
  {
    category: 'Frontend',
    icon: '◲',
    items: [
      { name: 'React', depth: 'core' },
      { name: 'Next.js', depth: 'core' },
      { name: 'Webpack / Vite', depth: 'working' },
      { name: 'Vue · Nuxt', depth: 'working' },
      { name: 'Angular · Svelte · Astro', depth: 'familiar' },
    ],
  },
  {
    category: 'Backend & Infra',
    icon: '☁',
    items: [
      { name: 'Node.js', depth: 'core' },
      { name: 'Express', depth: 'working' },
      { name: 'NestJS', depth: 'working' },
      { name: 'Docker', depth: 'working' },
      { name: 'GitHub Actions · CI/CD', depth: 'working' },
    ],
  },
  {
    category: 'Security',
    icon: '⛨',
    items: [
      { name: 'Secret scanning & remediation', depth: 'core' },
      { name: 'SCA / dependency auditing', depth: 'core' },
      { name: 'Snyk · npm audit', depth: 'working' },
      { name: 'Credential isolation design', depth: 'core' },
    ],
  },
  {
    category: 'Quality & Testing',
    icon: '✓',
    items: [
      { name: 'Playwright', depth: 'core' },
      { name: 'E2E test infrastructure', depth: 'core' },
      { name: 'Code review at scale', depth: 'core' },
    ],
  },
  {
    category: 'Ways of working',
    icon: '◈',
    items: [
      { name: 'Cross-team architecture', depth: 'core' },
      { name: 'Mentoring', depth: 'core' },
      { name: 'Technical writing', depth: 'working' },
      { name: 'MCP / AI tooling', depth: 'working' },
    ],
  },
]
