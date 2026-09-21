/**
 * The content schema.
 *
 * Everything the site says about you conforms to these types. Components never
 * hardcode a fact — swap `src/content/` wholesale and the site still builds.
 *
 * Two fields exist purely to keep you honest, and you should resist deleting them:
 *   - `Metric.source`      — how the number was measured
 *   - `Telemetry.sourcedFrom` — where the aggregate figures came from
 * If you cannot fill them in, the number should not be on the page.
 */

/* ---------------------------------------------------------------- profile -- */

export type Availability = 'open' | 'selectively-open' | 'not-looking'

export interface Profile {
  name: string
  title: string
  level: string
  location: string
  remote: string
  availability: {
    status: Availability
    label: string
    roles: string[]
  }
  /** One sentence. A claim, not a job title. */
  positioningClaim: string
  /** 1–2 sentences of supporting detail under the claim. */
  intro: string
  /** Cities you would relocate to. Shown in the header and the contact pane. */
  relocation: string[]
  avatar: string
  resumeHref: string
  lastUpdated: string
}

/* -------------------------------------------------------------- narrative -- */

export interface Investigation {
  title: string
  detail: string
  target?: string
}

export interface Narrative {
  /** Body paragraphs. Inline `code` and **bold** are supported by the renderer. */
  paragraphs: string[]
  currentlyInvestigating: Investigation[]
}

/* --------------------------------------------------------------- projects -- */

export interface Metric {
  label: string
  value: string
  /** Signed change, e.g. "-96%". Rendered with direction colouring. */
  delta?: string
  /** Is a rise good? Drives the delta colour. Defaults to true. */
  higherIsBetter?: boolean
  /** REQUIRED BY CONVENTION: how this was measured. Never ship a number without it. */
  source: string
}

export interface Tradeoff {
  chose: string
  over: string
  because: string
}

export interface Incident {
  symptom: string
  cause: string
  fix: string
}

export type ProjectLinkKind = 'repo' | 'demo' | 'doc' | 'rfc' | 'postmortem' | 'pr'

export interface ProjectLink {
  label: string
  href: string
  kind: ProjectLinkKind
}

export interface Project {
  id: string
  order: number
  name: string
  version?: string
  tagline: string
  stack: string[]
  /** "I" vs "we" — be explicit. e.g. "Lead, team of 4" or "Sole author". */
  role: string
  duration: string
  /** Who used it and at what size. */
  scale: string
  status?: 'shipped' | 'maintained' | 'archived' | 'in-progress'
  metrics: Metric[]
  tradeoffs: Tradeoff[]
  incident?: Incident
  links: ProjectLink[]
}

/* ------------------------------------------------------------- principles -- */

export interface Principle {
  id: string
  title: string
  body: string
  /** Project ids that demonstrate this. A principle with no evidence is a platitude. */
  appliedIn: string[]
}

/* ----------------------------------------------------------------- career -- */

export interface Promotion {
  to: string
  year: string
}

export interface CareerEntry {
  org: string
  title: string
  start: string
  end: string | 'present'
  location?: string
  promotions: Promotion[]
  highlights: string[]
}

export interface Education {
  institution: string
  degree: string
  year: string
  honors: string[]
}

export interface Award {
  title: string
  org: string
  year: string
  note?: string
}

export interface Career {
  entries: CareerEntry[]
  education: Education[]
  awards: Award[]
  mentoring?: string
}

/* ----------------------------------------------------------------- skills -- */

export interface Skill {
  name: string
  /** Optional honesty marker. Omit rather than inflate. */
  depth?: 'core' | 'working' | 'familiar'
  since?: string
}

export interface SkillGroup {
  category: string
  icon: string
  items: Skill[]
}

/* -------------------------------------------------------------- telemetry -- */

export interface ProportionSlice {
  name: string
  percent: number
}

/** @deprecated use ProportionSlice */
export type LanguageSlice = ProportionSlice

export interface TelemetryStat {
  label: string
  value: string
  note?: string
}

export interface Telemetry {
  stats: TelemetryStat[]
  languageSplit: ProportionSlice[]
  /** Repository footprint by access level. Max 4 slices — fold the rest into "Other". */
  repoSplit: ProportionSlice[]
  /** Where these numbers came from. Shown in the UI. Do not remove. */
  sourcedFrom: string
}

/* ---------------------------------------------------------------- contact -- */

export type ContactKind = 'email' | 'linkedin' | 'github' | 'phone' | 'calendar' | 'other'

export interface ContactMethod {
  kind: ContactKind
  label: string
  value: string
  href: string
  primary?: boolean
}

export interface RecruiterForm {
  /** Prefix for the composed email subject, so these land in one filter in your inbox. */
  subjectPrefix: string
}

export interface Contact {
  methods: ContactMethod[]
  /** Short note on what you do and don't want to be contacted about. */
  note: string
  form: RecruiterForm
}

/* ------------------------------------------------------------------- docs -- */

export type DocKind = 'rfc' | 'postmortem' | 'note' | 'config'

export interface Doc {
  /** Virtual path, must match an entry in lib/vfs.ts */
  path: string
  title: string
  kind: DocKind
  date: string
  summary: string
  /** Markdown-lite: '# ', '## ', '- ', '> ', '```', and blank-line paragraphs. */
  body: string
  relatedProjects: string[]
}

/* ----------------------------------------------------------- quick facts -- */

/** The terminal's JSON dump — the 10-second version for someone who reads nothing else. */
export interface QuickFacts {
  candidate: string
  role: string
  location: string
  experience: string
  corePillars: string[]
  availability: {
    status: string
    roles: string[]
    willRelocateTo: string[]
    contactDirect: string
  }
}
