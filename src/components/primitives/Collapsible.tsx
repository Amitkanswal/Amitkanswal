import type { ReactNode } from 'react'

/**
 * Progressive disclosure. Summary stays visible for the recruiter; the technical
 * detail is one click away for the engineer. Uses native <details> so it works
 * without JS and is keyboard-accessible for free.
 */
export function Collapsible({
  summary,
  children,
  defaultOpen = false,
}: {
  summary: string
  children: ReactNode
  defaultOpen?: boolean
}) {
  return (
    <details open={defaultOpen} className="group rounded-md border border-[var(--border)]">
      <summary className="cursor-pointer list-none px-3 py-2 text-[12px] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]">
        <span aria-hidden className="mr-2 inline-block transition-transform group-open:rotate-90">
          ▸
        </span>
        {summary}
      </summary>
      <div className="border-t border-[var(--border)] px-3 py-3">{children}</div>
    </details>
  )
}
