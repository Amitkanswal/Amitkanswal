/**
 * Conversion tracking.
 *
 * The only two events that matter are the resume download and the contact click.
 * Wire this to a privacy-respecting provider (Plausible, Umami, GoatCounter) —
 * it is a no-op until you do.
 */
type EventName = 'resume_download' | 'contact_click' | 'file_open' | 'doc_read'

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void
  }
}

export function track(event: EventName, props?: Record<string, string>): void {
  if (typeof window === 'undefined') return
  window.plausible?.(event, props ? { props } : undefined)
}
