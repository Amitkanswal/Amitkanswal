import { projects } from '@/content'
import { Badge } from '../primitives/Badge'
import { Callout } from '../primitives/Callout'
import { Collapsible } from '../primitives/Collapsible'
import { MetricTile } from '../primitives/MetricTile'
import { Section } from '../primitives/Section'

export function ProjectsPane() {
  const ordered = [...projects].sort((a, b) => a.order - b.order)

  return (
    <Section
      id="case-studies"
      icon="◎"
      title="Architectural case studies"
      meta={`${ordered.length} systems`}
    >
      <div className="space-y-5">
        {ordered.map((project, i) => (
          <article
            key={project.id}
            id={project.id}
            data-outline={project.name}
            data-outline-depth={2}
            className="scroll-mt-20 rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] p-5"
          >
            <header className="mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="tabular-nums text-[12px] text-[var(--text-muted)]">
                  {String(i + 1).padStart(2, '0')}.
                </span>
                <h3 className="font-sans text-[15px] font-semibold text-[var(--text-primary)]">
                  {project.name}
                </h3>
                {project.version && <Badge>{project.version}</Badge>}
                {project.status && (
                  <Badge tone={project.status === 'archived' ? 'neutral' : 'good'}>
                    {project.status}
                  </Badge>
                )}
                <span className="w-full text-[11px] text-[var(--text-muted)] sm:ml-auto sm:w-auto sm:text-right">
                  {project.scale}
                </span>
              </div>

              <p className="mt-1 text-[12.5px] text-[var(--text-secondary)]">{project.tagline}</p>

              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[var(--text-muted)]">
                <span>
                  <span aria-hidden>▸ </span>
                  {project.role}
                </span>
                <span>
                  <span aria-hidden>⏱ </span>
                  {project.duration}
                </span>
                <span>{project.stack.join(' · ')}</span>
              </p>
            </header>

            {project.metrics.length > 0 && (
              <div className="mb-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                {project.metrics.map((m) => (
                  <MetricTile key={m.label} metric={m} />
                ))}
              </div>
            )}

            <div className="grid gap-3 lg:grid-cols-2">
              <Callout title="Trade-offs" icon="⑂">
                <ul className="space-y-2">
                  {project.tradeoffs.map((t, j) => (
                    <li key={j}>
                      Chose <strong className="text-[var(--text-primary)]">{t.chose}</strong> over{' '}
                      {t.over} — {t.because}
                    </li>
                  ))}
                </ul>
              </Callout>

              {project.incident && (
                <Callout title="Incident & fix" icon="⚠" tone="danger">
                  <p>
                    <strong className="text-[var(--text-primary)]">Symptom:</strong>{' '}
                    {project.incident.symptom}
                  </p>
                  <p className="mt-1.5">
                    <strong className="text-[var(--text-primary)]">Cause:</strong>{' '}
                    {project.incident.cause}
                  </p>
                  <p className="mt-1.5">
                    <strong className="text-[var(--text-primary)]">Fix:</strong>{' '}
                    {project.incident.fix}
                  </p>
                </Callout>
              )}
            </div>

            {project.links.length > 0 && (
              <div className="mt-3">
                <Collapsible summary={`Artifacts (${project.links.length})`}>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2">
                    {project.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[12px] text-[var(--accent)] underline underline-offset-2"
                        >
                          <span aria-hidden className="mr-1.5">
                            ↗
                          </span>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Collapsible>
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  )
}
