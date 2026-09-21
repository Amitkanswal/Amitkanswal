import type { Principle } from '@/types/content'

export const principles: Principle[] = [
  {
    id: 'reject-at-the-boundary',
    title: 'Reject at the boundary, not three layers in',
    body:
      'A value that fails validation deep in the call stack has already been written ' +
      'somewhere. The expensive part of bad input is not the rejection, it is the partial ' +
      'state you have to unwind. So the schema gate goes at the edge, before anything is ' +
      'committed — and everything past it can assume its inputs are well-formed. The cost ' +
      'is that the boundary needs a real schema, maintained, versioned, and owned by someone.',
    appliedIn: ['app-sdk-setdata', 'api-proxy'],
  },

  {
    id: 'error-contracts',
    title: 'An error message is part of the API',
    body:
      'When your consumer is a third-party developer who cannot read your source, a thrown ' +
      'string is not debuggable — only the person who wrote it can decode it. Structured, ' +
      'field-level errors say which field, which rule, and what to change. I treat error ' +
      'shape as a versioned contract, which means it cannot be quietly improved later; ' +
      'that constraint is the point.',
    appliedIn: ['app-sdk-setdata'],
  },

  {
    id: 'secret-side-of-the-boundary',
    title: 'Keep the secret on your side of the trust boundary',
    body:
      'Anything running in the user’s browser is readable by the user. So the question is ' +
      'never "how do we scope this token" but "why does the client hold a token at all". ' +
      'A proxy that executes on the app’s behalf costs a network hop and buys the removal of ' +
      'an entire category of incident. I take that trade almost every time.',
    appliedIn: ['api-proxy'],
  },

  {
    id: 'defaults-are-the-docs',
    title: 'Defaults are the documentation people actually read',
    body:
      'Anything you leave to a guide gets re-derived, differently, by every team that ' +
      'needs it. Anything you put in the boilerplate gets adopted by default. This is why ' +
      'I would rather ship an opinionated starter than a thorough README — and why ten ' +
      'maintained starters beat one generic abstraction, even though it is more work.',
    appliedIn: ['starter-fleet', 'marketplace-apps'],
  },

  {
    id: 'review-is-the-job',
    title: 'On a platform team, review is the leverage',
    body:
      'I have reviewed close to as many pull requests as I have opened. That is not ' +
      'overhead around the work — on a platform team it is the work. A contract you enforce ' +
      'in review costs an afternoon; the same contract enforced after adoption is a ' +
      'migration. The failure mode to watch is becoming a bottleneck, which is why the ' +
      'rules worth holding get moved into lint, types and boilerplate as fast as possible.',
    appliedIn: ['marketplace-apps', 'starter-fleet'],
  },

  {
    id: 'optimise-cold-start',
    title: 'Optimise the path the user is actually on',
    body:
      'The worst startup time I inherited was not slow code — it was several copies of the ' +
      'same framework loading in sequence. Most large performance wins I have shipped came ' +
      'from deleting ' +
      'duplicated work rather than making work faster — which means the first job is always ' +
      'measuring the real cold path, not the benchmark that is convenient to run.',
    appliedIn: ['developer-hub-platform'],
  },

  {
    id: 'closing-needs-a-reason',
    title: 'A resolution with no recorded reason is a deletion',
    body:
      'Triaging security findings across a large repository estate taught me this one ' +
      'properly. Closing a finding and recording why you closed it are different acts, ' +
      'and only the second survives contact with the next person. So the tag goes on ' +
      'before the close, every time, and when no rule fits, the finding stays open — ' +
      'a false “resolved” is the only unrecoverable state in the process. Queue length ' +
      'is the wrong thing to optimise.',
    appliedIn: ['secret-remediation'],
  },
]
