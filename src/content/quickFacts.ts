import type { QuickFacts } from '@/types/content'
import { profile } from './profile'
import { contact } from './contact'

/** The terminal dump: the ten-second version for someone who reads nothing else. */
export const quickFacts: QuickFacts = {
  candidate: profile.name,
  role: profile.title,
  location: `${profile.location} · ${profile.remote}`,
  experience: '6+ years — developer platforms, SDKs and extension architecture',
  corePillars: [
    'SDK & extension-surface design',
    'Micro-frontend platform architecture',
    'Trust boundaries: validation, error contracts, credential isolation',
    'Security remediation at repository-estate scale',
  ],
  availability: {
    status: profile.availability.label,
    roles: profile.availability.roles,
    willRelocateTo: profile.relocation,
    contactDirect: contact.methods.find((m) => m.primary)?.value ?? '',
  },
}
