import { telemetry } from '@/content'
import { ProportionMeter } from '../primitives/ProportionMeter'

/**
 * Always-visible credibility panel. Deliberately persistent: the quantified evidence
 * should not scroll away with the section it belongs to.
 */
export function TelemetryPanel() {
  return (
    <section
      aria-labelledby="telemetry-heading"
      className="border-t border-[var(--border)] px-3 py-3"
    >
      <h2
        id="telemetry-heading"
        className="mb-3 text-[10px] font-semibold tracking-[0.1em] text-[var(--text-muted)] uppercase"
      >
        Repository telemetry
      </h2>

      <dl className="mb-4 grid grid-cols-2 gap-x-3 gap-y-2.5">
        {telemetry.stats.map((stat) => (
          <div key={stat.label} title={stat.note}>
            <dt className="text-[10px] text-[var(--text-muted)]">{stat.label}</dt>
            <dd className="font-sans text-[15px] leading-tight font-semibold text-[var(--text-primary)]">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      {telemetry.repoSplit.length > 0 && (
        <>
          <p className="mb-2 text-[10px] tracking-[0.08em] text-[var(--text-muted)] uppercase">
            Repos by access
          </p>
          <ProportionMeter slices={telemetry.repoSplit} label="Repositories by access level" />
        </>
      )}

      {telemetry.languageSplit.length > 0 && (
        <>
          <p className="mt-4 mb-2 text-[10px] tracking-[0.08em] text-[var(--text-muted)] uppercase">
            Languages
          </p>
          <ProportionMeter slices={telemetry.languageSplit} label="Language split" />
        </>
      )}

      <p className="mt-3 text-[10px] leading-snug text-[var(--text-muted)]">
        <span aria-hidden>↳ </span>
        {telemetry.sourcedFrom}
      </p>
    </section>
  )
}
