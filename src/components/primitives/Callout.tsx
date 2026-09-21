import type { ReactNode } from 'react'

export type CalloutTone = 'neutral' | 'good' | 'warn' | 'danger'

const TONE: Record<CalloutTone, { bar: string; label: string }> = {
  neutral: { bar: 'bg-[var(--border-strong)]', label: 'text-[var(--text-secondary)]' },
  good: { bar: 'bg-[var(--good)]', label: 'text-[var(--good)]' },
  warn: { bar: 'bg-[var(--warn)]', label: 'text-[var(--warn)]' },
  danger: { bar: 'bg-[var(--danger)]', label: 'text-[var(--danger)]' },
}

export function Callout({
  title,
  icon,
  tone = 'neutral',
  children,
}: {
  title: string
  /** Paired with the tone so state never reads as colour alone. */
  icon: string
  tone?: CalloutTone
  children: ReactNode
}) {
  const t = TONE[tone]
  return (
    <div className="flex gap-3 rounded-md border border-[var(--border)] bg-[var(--bg-raised)] p-3">
      <span aria-hidden className={`w-0.5 shrink-0 rounded-full ${t.bar}`} />
      <div className="min-w-0">
        <p className={`mb-1 text-[11px] font-semibold tracking-wide uppercase ${t.label}`}>
          <span aria-hidden className="mr-1.5">
            {icon}
          </span>
          {title}
        </p>
        <div className="text-[12.5px] leading-relaxed text-[var(--text-secondary)]">{children}</div>
      </div>
    </div>
  )
}
