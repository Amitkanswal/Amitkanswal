import type { VFSFile } from '@/lib/vfs'
import { docs, narrative, profile } from '@/content'
import { Markdown } from '../primitives/Markdown'
import { Section } from '../primitives/Section'
import { Badge } from '../primitives/Badge'

export function MarkdownPane({ file }: { file: VFSFile }) {
  if (file.path === 'src/README.md') return <Readme />

  const doc = docs.find((d) => d.path === file.path)
  if (!doc) {
    return <p className="text-[var(--text-muted)]">No content registered for {file.path}.</p>
  }

  return (
    <article className="space-y-6">
      <header>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge tone="accent">{doc.kind}</Badge>
          <span className="text-[11px] text-[var(--text-muted)]">{doc.date}</span>
        </div>
        <h1
          id="doc-title"
          data-outline={doc.title}
          className="text-[19px] font-semibold text-[var(--text-primary)]"
        >
          {doc.title}
        </h1>
        <p className="mt-1 text-[13px] text-[var(--text-secondary)]">{doc.summary}</p>
      </header>
      <Markdown source={doc.body} />
    </article>
  )
}

function Readme() {
  return (
    <div className="space-y-10">
      <header>
        <div className="flex flex-wrap items-start gap-4">
          <div
            aria-hidden
            className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--bg-raised)] font-sans text-[18px] font-semibold text-[var(--text-secondary)]"
          >
            {profile.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>

          <div className="min-w-0 flex-1">
            <h1
              id="intro"
              data-outline="Positioning"
              className="flex flex-wrap items-center gap-2.5 font-sans text-[22px] leading-tight font-semibold text-[var(--text-primary)]"
            >
              {profile.name}
              <Badge tone="accent">{profile.level}</Badge>
            </h1>
            <p className="mt-0.5 text-[13px] text-[var(--text-secondary)]">{profile.title}</p>
            <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-[var(--text-muted)]">
              <span>
                <span aria-hidden>◉ </span>
                {profile.location} · {profile.remote}
              </span>
              <span>
                <span aria-hidden>✈ </span>
                Will relocate: {profile.relocation.join(' · ')}
              </span>
              <span>
                <span aria-hidden>⏱ </span>
                Updated {profile.lastUpdated}
              </span>
            </p>
          </div>
        </div>

        <blockquote className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] p-5">
          <p className="font-sans text-[19px] leading-snug font-semibold text-[var(--text-primary)]">
            “{profile.positioningClaim}”
          </p>
          <p className="mt-2.5 text-[13px] text-[var(--text-secondary)]">{profile.intro}</p>
        </blockquote>
      </header>

      <Section id="narrative" icon="≡" title="Engineering narrative" depth={1}>
        <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
          <div className="space-y-3.5">
            {narrative.paragraphs.map((p, i) => (
              <Markdown key={i} source={p} />
            ))}
          </div>

          <aside className="space-y-3">
            <p className="text-[10px] font-semibold tracking-[0.1em] text-[var(--text-muted)] uppercase">
              Now investigating
            </p>
            {narrative.currentlyInvestigating.map((item, i) => (
              <div
                key={i}
                className="rounded-md border border-[var(--border)] bg-[var(--bg-raised)] p-3"
              >
                <p className="text-[12px] font-medium text-[var(--text-primary)]">{item.title}</p>
                <p className="mt-1 text-[11.5px] leading-snug text-[var(--text-secondary)]">
                  {item.detail}
                </p>
                {item.target && (
                  <p className="mt-2 text-[10.5px] text-[var(--text-muted)]">
                    Target: {item.target}
                  </p>
                )}
              </div>
            ))}
          </aside>
        </div>
      </Section>
    </div>
  )
}
