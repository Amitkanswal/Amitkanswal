import { career } from '@/content'
import { Section } from '../primitives/Section'
import { Badge } from '../primitives/Badge'

/** Timeline, presented with the visual grammar of a JSON document. */
export function JsonPane() {
  return (
    <div className="space-y-8">
      <Section id="timeline" icon="{ }" title="Career timeline">
        <ol className="space-y-4">
          {career.entries.map((entry) => (
            <li
              key={`${entry.org}-${entry.start}`}
              id={`role-${entry.org.toLowerCase().replace(/\W+/g, '-')}`}
              data-outline={entry.org}
              data-outline-depth={2}
              className="scroll-mt-20 rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] p-4"
            >
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="font-sans text-[14px] font-semibold text-[var(--text-primary)]">
                  {entry.title}
                </h3>
                <span className="text-[12px] text-[var(--text-secondary)]">@ {entry.org}</span>
                <span className="ml-auto tabular-nums text-[11px] text-[var(--text-muted)]">
                  {entry.start} → {entry.end}
                </span>
              </div>

              {entry.location && (
                <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">{entry.location}</p>
              )}

              {entry.promotions.length > 0 && (
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {entry.promotions.map((p, i) => (
                    <li key={i}>
                      <Badge tone="good">
                        ↑ {p.to} · {p.year}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}

              {entry.highlights.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {entry.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2 text-[12.5px] text-[var(--text-secondary)]">
                      <span aria-hidden className="text-[var(--text-muted)]">
                        ·
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section id="education" icon="⌂" title="Education">
        <ul className="space-y-2">
          {career.education.map((ed, i) => (
            <li
              key={i}
              className="flex flex-wrap items-baseline gap-2 rounded-md border border-[var(--border)] bg-[var(--bg-raised)] p-3"
            >
              <span className="text-[13px] text-[var(--text-primary)]">{ed.degree}</span>
              <span className="text-[12px] text-[var(--text-secondary)]">{ed.institution}</span>
              <span className="ml-auto tabular-nums text-[11px] text-[var(--text-muted)]">
                {ed.year}
              </span>
              {ed.honors.length > 0 && (
                <span className="w-full text-[11px] text-[var(--text-muted)]">
                  {ed.honors.join(' · ')}
                </span>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="recognition" icon="★" title="Recognition">
        <ul className="space-y-2">
          {career.awards.map((award, i) => (
            <li
              key={i}
              className="flex flex-wrap items-baseline gap-2 rounded-md border border-[var(--border)] bg-[var(--bg-raised)] p-3"
            >
              <span className="text-[13px] text-[var(--text-primary)]">{award.title}</span>
              <span className="text-[12px] text-[var(--text-secondary)]">{award.org}</span>
              <span className="ml-auto tabular-nums text-[11px] text-[var(--text-muted)]">
                {award.year}
              </span>
              {award.note && (
                <span className="w-full text-[11px] text-[var(--text-muted)]">{award.note}</span>
              )}
            </li>
          ))}
        </ul>

        {career.mentoring && (
          <p className="mt-3 text-[12.5px] text-[var(--text-secondary)]">
            <span aria-hidden className="text-[var(--text-muted)]">
              ↳{' '}
            </span>
            {career.mentoring}
          </p>
        )}
      </Section>
    </div>
  )
}
