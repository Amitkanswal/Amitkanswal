import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { contact, profile } from '@/content'
import { readJd } from '@/lib/readJd'
import { track } from '@/lib/analytics'

type Status = 'idle' | 'sent'
type JdState =
  | { kind: 'none' }
  | { kind: 'reading'; name: string }
  | { kind: 'ready'; name: string; text: string; chars: number; pages?: number }
  | { kind: 'error'; message: string }

/** Long JDs blow past mailto URL limits in most clients. Trim there, full text on copy. */
const MAILTO_JD_LIMIT = 1200

const FIELD =
  'w-full rounded border border-[var(--border)] bg-[var(--bg-surface)] px-2.5 py-1.5 ' +
  'text-[12.5px] text-[var(--text-primary)] outline-none transition-colors ' +
  'placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]'

const LABEL = 'mb-1 block text-[10.5px] tracking-[0.06em] text-[var(--text-muted)] uppercase'

/**
 * Recruiter intake — entirely client-side.
 *
 * No form backend, no subscription, no public endpoint. The optional JD is parsed in the
 * browser (see lib/readJd.ts) and its text is folded into a message the recruiter sends
 * from their own mail client, so they keep the thread and nothing is stored here.
 *
 * The honeypot is not optional. A contact form on a page that ranks for your name gets
 * scraped within days.
 */
export function RecruiterForm() {
  const { form } = contact
  const email = contact.methods.find((m) => m.primary)?.value ?? ''
  const formRef = useRef<HTMLFormElement>(null)

  const [jd, setJd] = useState<JdState>({ kind: 'none' })
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)

  async function onPickFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return setJd({ kind: 'none' })
    setJd({ kind: 'reading', name: file.name })
    try {
      const { text, chars, pages } = await readJd(file)
      setJd({ kind: 'ready', name: file.name, text, chars, pages })
    } catch (err) {
      setJd({ kind: 'error', message: err instanceof Error ? err.message : 'Could not read that.' })
    }
  }

  function compose(full: boolean) {
    const data = new FormData(formRef.current!)
    const get = (k: string) => String(data.get(k) ?? '').trim()

    const jdText =
      jd.kind === 'ready'
        ? full
          ? jd.text
          : jd.text.slice(0, MAILTO_JD_LIMIT) +
            (jd.chars > MAILTO_JD_LIMIT ? '\n\n[…trimmed — full JD attached or on request]' : '')
        : ''

    const subject = `${form.subjectPrefix} ${get('role') || 'Opportunity'} — ${get('company')}`
    const body = [
      `Role:       ${get('role')}`,
      `Company:    ${get('company')}`,
      `Location:   ${get('location')}`,
      get('comp') && `Comp range: ${get('comp')}`,
      get('jdLink') && `JD link:    ${get('jdLink')}`,
      '',
      get('message'),
      jdText && `\n--- Job description (${jd.kind === 'ready' ? jd.name : ''}) ---\n${jdText}`,
      '',
      '—',
      `From: ${get('name')}${get('replyTo') ? ` <${get('replyTo')}>` : ''}`,
      `Sent from ${profile.name}'s site`,
    ]
      .filter(Boolean)
      .join('\n')

    return { subject, body }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (String(new FormData(e.currentTarget).get('company_website') ?? '')) {
      setStatus('sent')
      return
    }
    track('contact_click', { kind: 'recruiter_form' })
    const { subject, body } = compose(false)
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setStatus('sent')
  }

  async function onCopy() {
    const { subject, body } = compose(true)
    try {
      await navigator.clipboard.writeText(`To: ${email}\nSubject: ${subject}\n\n${body}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      /* clipboard blocked — the compose button still works */
    }
  }

  const jdTooLong = jd.kind === 'ready' && jd.chars > MAILTO_JD_LIMIT

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] p-4"
    >
      <p className="mb-1 text-[12px] text-[var(--text-primary)]">
        <span aria-hidden className="mr-1.5 text-[var(--text-muted)]">
          $
        </span>
        Hiring for something?
      </p>
      <p className="mb-4 max-w-2xl text-[11.5px] leading-relaxed text-[var(--text-secondary)]">
        Four fields and I will come back to you. A comp range and a straight answer on
        location get a faster reply than a JD alone.
      </p>

      {/* honeypot — off-screen rather than display:none, so bots still fill it */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_website">Leave this empty</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { id: 'rf-name', name: 'name', label: 'Your name *', ph: 'Jane Doe', req: true },
          { id: 'rf-company', name: 'company', label: 'Company *', ph: 'Acme', req: true },
          {
            id: 'rf-role',
            name: 'role',
            label: 'Role title *',
            ph: 'Senior Platform Engineer',
            req: true,
          },
          {
            id: 'rf-location',
            name: 'location',
            label: 'Location / remote policy *',
            ph: 'Bengaluru, hybrid 3d',
            req: true,
          },
          { id: 'rf-comp', name: 'comp', label: 'Comp range', ph: 'Optional, but it helps' },
          {
            id: 'rf-reply',
            name: 'replyTo',
            label: 'Reply-to email',
            ph: 'you@company.com',
            type: 'email',
          },
        ].map((f) => (
          <div key={f.id}>
            <label className={LABEL} htmlFor={f.id}>
              {f.label}
            </label>
            <input
              id={f.id}
              name={f.name}
              type={f.type ?? 'text'}
              required={f.req}
              placeholder={f.ph}
              className={FIELD}
            />
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="rf-jd">
            Job description link
          </label>
          <input id="rf-jd" name="jdLink" type="url" className={FIELD} placeholder="https://…" />
        </div>
        <div>
          <label className={LABEL} htmlFor="rf-file">
            …or drop the JD file
          </label>
          <input
            id="rf-file"
            type="file"
            accept=".pdf,.txt,.md,.markdown,.rtf"
            onChange={onPickFile}
            aria-describedby="rf-file-help"
            className={`${FIELD} file:mr-3 file:rounded file:border-0 file:bg-[var(--bg-hover)] file:px-2 file:py-1 file:text-[11px] file:text-[var(--text-secondary)]`}
          />
        </div>
      </div>

      <p id="rf-file-help" aria-live="polite" className="mt-1.5 text-[10.5px] leading-snug">
        {jd.kind === 'none' && (
          <span className="text-[var(--text-muted)]">
            PDF or text. Read in your browser — the file is never uploaded anywhere.
          </span>
        )}
        {jd.kind === 'reading' && (
          <span className="text-[var(--text-secondary)]">Reading {jd.name}…</span>
        )}
        {jd.kind === 'ready' && (
          <span style={{ color: 'var(--good)' }}>
            ✓ Read {jd.name} — {jd.chars.toLocaleString()} characters
            {jd.pages ? ` across ${jd.pages} page${jd.pages > 1 ? 's' : ''}` : ''}.
            {jdTooLong && (
              <span className="text-[var(--text-muted)]">
                {' '}
                Long JD — use “Copy full message” so none of it is trimmed.
              </span>
            )}
          </span>
        )}
        {jd.kind === 'error' && <span style={{ color: 'var(--warn)' }}>{jd.message}</span>}
      </p>

      <div className="mt-3">
        <label className={LABEL} htmlFor="rf-message">
          Anything else
        </label>
        <textarea
          id="rf-message"
          name="message"
          rows={3}
          className={`${FIELD} resize-y`}
          placeholder="What does the team own? What is broken that you want fixed?"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <button
          type="submit"
          className="rounded border border-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1.5 text-[12px] text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-white"
        >
          Compose email
        </button>
        <button
          type="button"
          onClick={onCopy}
          className="rounded border border-[var(--border-strong)] px-3 py-1.5 text-[12px] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
        >
          {copied ? 'Copied ✓' : 'Copy full message'}
        </button>
        <a
          href={`mailto:${email}`}
          onClick={() => track('contact_click', { kind: 'email_direct' })}
          className="text-[11.5px] text-[var(--text-muted)] underline underline-offset-2 hover:text-[var(--text-secondary)]"
        >
          or just email me
        </a>

        <p aria-live="polite" className="text-[11px] text-[var(--text-muted)]">
          {status === 'sent' && 'Opened in your mail client — send it from there.'}
        </p>
      </div>

      <p className="mt-3 text-[10.5px] leading-snug text-[var(--text-muted)]">
        <span aria-hidden>↳ </span>
        Nothing is stored or transmitted by this page. It reads the JD locally and composes
        a message in your own mail client, so you keep the thread.
      </p>
    </form>
  )
}
