import type { ReactNode } from 'react'

export type BadgeTone = 'neutral' | 'accent' | 'good' | 'warn' | 'danger'

const TONE: Record<BadgeTone, string> = {
  neutral: 'text-[var(--text-secondary)] border-[var(--border-strong)]',
  accent: 'text-[var(--accent)] border-[var(--accent)]',
  good: 'text-[var(--good)] border-[var(--good)]',
  warn: 'text-[var(--warn)] border-[var(--warn)]',
  danger: 'text-[var(--danger)] border-[var(--danger)]',
}

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: BadgeTone }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-1.5 py-px text-[10px] leading-4 tracking-wide uppercase ${TONE[tone]}`}
    >
      {children}
    </span>
  )
}
