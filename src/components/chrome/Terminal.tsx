import { useState } from 'react'
import { quickFacts } from '@/content'

/**
 * The recruiter TL;DR.
 *
 * Highest-value element on the page: the ten-second version for someone who will
 * not read anything else. Keep the JSON short enough to fit without scrolling.
 */
export function Terminal() {
  // Collapsed by default on short/narrow viewports — on a phone the terminal
  // would otherwise eat half the screen before any content is visible.
  const [collapsed, setCollapsed] = useState(
    () => typeof window !== 'undefined' && (window.innerWidth < 768 || window.innerHeight < 700),
  )
  const json = JSON.stringify(quickFacts, null, 2)

  return (
    <section
      aria-label="Quick facts"
      className="shrink-0 border-t border-[var(--border)] bg-[var(--bg-deep)]"
    >
      <div className="flex items-center gap-3 border-b border-[var(--border)] px-3 py-1.5">
        <span className="text-[10px] font-semibold tracking-[0.1em] text-[var(--text-secondary)] uppercase">
          Terminal
        </span>
        <span className="text-[10px] text-[var(--text-muted)]">quick-facts</span>
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-expanded={!collapsed}
          className="ml-auto rounded px-1.5 text-[12px] text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
        >
          <span aria-hidden>{collapsed ? '▴' : '▾'}</span>
          <span className="sr-only">{collapsed ? 'Expand' : 'Collapse'} terminal</span>
        </button>
      </div>

      {!collapsed && (
        <div className="max-h-[min(14rem,32vh)] overflow-y-auto px-3 py-2.5">
          <p className="text-[11.5px] text-[var(--text-muted)]">
            <span style={{ color: 'var(--good)' }}>~/portfolio</span>
            <span className="mx-1.5">$</span>
            <span className="text-[var(--text-secondary)]">./quick-facts.sh --format json</span>
          </p>
          <pre className="mt-1.5 text-[11.5px] leading-relaxed whitespace-pre-wrap text-[var(--text-secondary)]">
            <code>{json}</code>
          </pre>
          <p className="mt-1.5 text-[11.5px] text-[var(--text-muted)]">
            <span style={{ color: 'var(--good)' }}>~/portfolio</span>
            <span className="mx-1.5">$</span>
            <span className="caret" aria-hidden>
              ▋
            </span>
          </p>
        </div>
      )}
    </section>
  )
}
