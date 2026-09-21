import type { ReactNode } from 'react'

/**
 * A pane section. The `data-outline` attribute is what the outline panel scans —
 * every section gets an id, so every section is deep-linkable.
 */
export function Section({
  id,
  icon,
  title,
  meta,
  depth = 1,
  children,
}: {
  id: string
  icon: string
  title: string
  meta?: string
  depth?: number
  children: ReactNode
}) {
  return (
    <section className="scroll-mt-20">
      <h2
        id={id}
        data-outline={title}
        data-outline-depth={depth}
        className="mb-4 flex items-baseline gap-2 text-[15px] font-semibold text-[var(--text-primary)]"
      >
        <span aria-hidden className="text-[var(--text-muted)]">
          {icon}
        </span>
        <span>{title}</span>
        {meta && (
          <span className="ml-auto text-[10.5px] font-normal text-[var(--text-muted)]">{meta}</span>
        )}
      </h2>
      {children}
    </section>
  )
}
