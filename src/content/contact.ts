import type { Contact } from '@/types/content'

export const contact: Contact = {
  methods: [
    {
      kind: 'email',
      label: 'email',
      value: 'amitkanswal7@gmail.com',
      href: 'mailto:amitkanswal7@gmail.com',
      primary: true,
    },
    {
      kind: 'linkedin',
      label: 'linkedin',
      value: 'in/amit-kanswal-447558147',
      href: 'https://www.linkedin.com/in/amit-kanswal-447558147',
    },
    {
      kind: 'github',
      label: 'github',
      value: 'Amitkanswal',
      href: 'https://github.com/Amitkanswal',
    },
  ],

  note:
    'Best reached by email. I am interested in senior platform, developer-experience and ' +
    'SDK roles — remote from IST, or on-site in the cities below. If you are hiring for ' +
    'one, tell me what the platform’s users actually complain about; that tells me more ' +
    'than a job description does.',

  form: {
    // Subject prefix, so these land in one filter in your inbox.
    subjectPrefix: '[Role]',
  },
}
