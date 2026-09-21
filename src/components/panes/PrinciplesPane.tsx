import { principles, projects } from '@/content'
import { Section } from '../primitives/Section'

export function PrinciplesPane() {
  return (
    <Section
      id="principles"
      icon="⌗"
      title="How I think"
      meta={`${principles.length} heuristics`}
    >
      <ol className="space-y-4">
        {principles.map((principle, i) => {
          const evidence = principle.appliedIn
            .map((id) => projects.find((p) => p.id === id))
            .filter(Boolean)

          return (
            <li
              key={principle.id}
              id={principle.id}
              data-outline={principle.title}
              data-outline-depth={2}
              className="scroll-mt-20 rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] p-4"
            >
              <p className="mb-1.5 flex items-baseline gap-2">
                <span className="tabular-nums text-[11.5px] text-[var(--text-muted)]">
                  // {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-sans text-[14px] font-semibold text-[var(--text-primary)]">
                  {principle.title}
                </span>
              </p>
              <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]">
                {principle.body}
              </p>

              {evidence.length > 0 && (
                <p className="mt-2.5 text-[11px] text-[var(--text-muted)]">
                  <span aria-hidden>↳ </span>
                  Applied in:{' '}
                  {evidence.map((p, j) => (
                    <span key={p!.id}>
                      {j > 0 && ', '}
                      <a
                        href={`?f=src/projects.tsx#${p!.id}`}
                        className="text-[var(--accent)] underline underline-offset-2"
                      >
                        {p!.name}
                      </a>
                    </span>
                  ))}
                </p>
              )}
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
