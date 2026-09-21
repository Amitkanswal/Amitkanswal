import { contact, profile } from '@/content'
import { Section } from '../primitives/Section'
import { RecruiterForm } from '../primitives/RecruiterForm'
import { track } from '@/lib/analytics'

export function ShellPane() {
  return (
    <div className="space-y-8">
      <Section id="contact" icon="$" title="Contact">
        <p className="mb-4 max-w-2xl text-[13px] leading-relaxed text-[var(--text-secondary)]">
          {contact.note}
        </p>

        <ul className="space-y-2">
          {contact.methods.map((method) => (
            <li key={method.kind}>
              <a
                href={method.href}
                target={method.kind === 'email' || method.kind === 'phone' ? undefined : '_blank'}
                rel="noopener noreferrer"
                onClick={() => track('contact_click', { kind: method.kind })}
                className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-md border p-3 transition-colors hover:bg-[var(--bg-hover)] ${
                  method.primary
                    ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                    : 'border-[var(--border)] bg-[var(--bg-raised)]'
                }`}
              >
                <span className="text-[11.5px] text-[var(--text-muted)]">
                  <span aria-hidden>$ </span>
                  {method.label}
                </span>
                <span className="text-[13px] text-[var(--text-primary)]">{method.value}</span>
                {method.primary && (
                  <span className="ml-auto text-[10px] tracking-wide text-[var(--accent)] uppercase">
                    preferred
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="locations"
        icon="◉"
        title="Where I can work"
        meta={`${profile.relocation.length} cities`}
      >
        <div className="rounded-md border border-[var(--border)] bg-[var(--bg-raised)] p-4">
          <p className="mb-3 text-[12.5px] text-[var(--text-secondary)]">
            Currently in {profile.location}. Open to relocating, in roughly this order:
          </p>
          <ul className="flex flex-wrap gap-2">
            {profile.relocation.map((city, i) => (
              <li
                key={city}
                className="flex items-center gap-2 rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] px-2.5 py-1 text-[12px] text-[var(--text-primary)]"
              >
                <span aria-hidden className="tabular-nums text-[10px] text-[var(--text-muted)]">
                  {i + 1}
                </span>
                {city}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11.5px] text-[var(--text-secondary)]">
            <span aria-hidden className="text-[var(--text-muted)]">
              ↳{' '}
            </span>
            Also fully remote on IST, or overlapping hours with European teams.
          </p>
        </div>
      </Section>

      <Section id="hiring" icon="◈" title="For recruiters">
        <RecruiterForm />
      </Section>
    </div>
  )
}
