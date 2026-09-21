import type { Metric } from '@/types/content'

/**
 * Stat tile — a number with no plot, so no hover layer.
 *
 * `source` is deliberately surfaced as a title attribute and a visible marker:
 * a figure whose provenance you cannot state should be deleted, not decorated.
 */
export function MetricTile({ metric }: { metric: Metric }) {
  const higherIsBetter = metric.higherIsBetter ?? true
  const rising = metric.delta?.trim().startsWith('+')
  const good = metric.delta ? rising === higherIsBetter : undefined

  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--bg-raised)] p-3">
      <p className="text-[10px] font-medium tracking-[0.08em] text-[var(--text-muted)] uppercase">
        {metric.label}
      </p>
      <p className="mt-1.5 flex items-baseline gap-2">
        <span className="font-sans text-[19px] leading-none font-semibold text-[var(--text-primary)]">
          {metric.value}
        </span>
        {metric.delta && (
          <span
            className="text-[11px] font-medium"
            style={{ color: good ? 'var(--good)' : 'var(--danger)' }}
          >
            <span aria-hidden className="mr-0.5">
              {rising ? '▲' : '▼'}
            </span>
            {metric.delta}
          </span>
        )}
      </p>
      <p
        className="mt-2 truncate text-[10.5px] text-[var(--text-muted)]"
        title={metric.source}
      >
        <span aria-hidden>↳ </span>
        {metric.source}
      </p>
    </div>
  )
}
