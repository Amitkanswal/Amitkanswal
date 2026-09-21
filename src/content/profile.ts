import type { Profile } from '@/types/content'

export const profile: Profile = {
  name: 'Amit Kanswal',
  title: 'Senior Platform & Developer Experience Engineer',
  level: 'Senior',
  location: 'Pune, India',
  remote: 'Remote (IST) / Hybrid',
  availability: {
    status: 'open',
    label: 'Open to senior platform & DevX roles',
    roles: ['Senior Platform Engineer', 'Developer Experience', 'Developer Platforms'],
  },

  // Your current site says "I build the tools other engineers build on." That's true
  // but it describes half the industry. This one describes what is actually distinctive
  // about six years on App SDK / Developer Hub / Marketplace: the mutual-distrust boundary.
  // Swap it back if you disagree — it's one line.
  positioningClaim: 'I build the seam where someone else’s code runs safely inside your product.',

  intro:
    'Six years on Contentstack’s developer platform — the App SDK, Developer Hub and ' +
    'Marketplace that let external teams extend a CMS without either side trusting the ' +
    'other’s code.',

  // Cities you'd relocate to. Order matters — this is read as preference order.
  relocation: ['Bengaluru', 'Pune', 'Hyderabad', 'Delhi NCR'],

  avatar: '/avatar.webp',
  resumeHref: '/resume.pdf',
  lastUpdated: '2026-09-21',
}
