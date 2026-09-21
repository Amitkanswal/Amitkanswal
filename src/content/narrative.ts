import type { Narrative } from '@/types/content'

export const narrative: Narrative = {
  paragraphs: [
    'Most platform work is described as enablement. I think that framing is backwards. ' +
      'The interesting problem in a developer platform is not what you let people do — ' +
      'it is what you let them do **wrong**, and how cheap you make the discovery. An ' +
      'extension API that accepts anything is not flexible, it is a bug report deferred ' +
      'to someone else’s customer.',

    'So most of what I build is boundaries. `postMessage` protocols between an iframe app ' +
      'and the host UI. Schema validation that rejects at the edge instead of corrupting ' +
      'state three layers in. Structured, field-level error contracts, so a third-party ' +
      'developer reading a failure knows which field, which rule, and what to change — ' +
      'rather than a stack trace from a codebase they cannot see. The measure of that work ' +
      'is not uptime; it is how long it takes an external developer to get unstuck alone.',

    'The same instinct shows up away from feature work. Owning a slice of an org-wide ' +
      'secret-remediation programme is the same problem at a different scale: hundreds of ' +
      'repositories, findings that each need a decision, and a process where the only ' +
      'unrecoverable mistake is closing something you did not finish investigating. The ' +
      'answer there was also a contract — a read-down decision list, and a rule that ' +
      'nothing closes without a recorded reason.',

    'I have reviewed roughly as many ' +
      'pull requests as I have opened, across about thirty repositories. On a platform team ' +
      'that ratio is the job: the contract you enforce in review is the one that stops being ' +
      'a migration later. I am moving toward roles where that surface is the whole remit — ' +
      'internal developer platforms, SDK and API design, the tooling layer teams build on.',
  ],

  currentlyInvestigating: [
    {
      title: 'MCP as an internal tooling substrate',
      detail:
        'Building Model Context Protocol servers over internal docs and app scaffolding, ' +
        'to see how much of onboarding is really a retrieval problem.',
      target: 'Ongoing',
    },
    {
      title: 'Documentation as a machine-readable artifact',
      detail:
        'Restructuring internal docs into formats that generate correct code rather than ' +
        'plausible code. Mostly an exercise in how much implicit context a doc carries.',
    },
  ],
}
