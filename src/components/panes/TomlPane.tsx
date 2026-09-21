import { skills } from '@/content'
import { Section } from '../primitives/Section'

const DEPTH_LABEL: Record<string, string> = {
  core: 'core',
  working: 'working',
  familiar: 'familiar',
}

export function TomlPane() {
  return (
    <Section id="skills" icon="⊞" title="Skills matrix" meta={`${skills.length} groups`}>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {skills.map((group) => (
          <div
            key={group.category}
            id={`skills-${group.category.toLowerCase().replace(/\W+/g, '-')}`}
            data-outline={group.category}
            data-outline-depth={2}
            className="scroll-mt-20 rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] p-3"
          >
            <p className="mb-2.5 flex items-center gap-2 text-[11.5px] font-semibold text-[var(--text-primary)]">
              <span aria-hidden className="text-[var(--text-muted)]">
                {group.icon}
              </span>
              {group.category}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-baseline gap-2 rounded border border-[var(--border)] bg-[var(--bg-surface)] px-2 py-1 text-[12px] text-[var(--text-secondary)]"
                >
                  <span className="truncate">{item.name}</span>
                  {item.depth && (
                    <span className="ml-auto shrink-0 text-[10px] text-[var(--text-muted)]">
                      {DEPTH_LABEL[item.depth]}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[11px] text-[var(--text-muted)]">
        <span aria-hidden>↳ </span>
        Nothing listed here that would not survive a thirty-minute conversation.
      </p>
    </Section>
  )
}
