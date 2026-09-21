import type { VFSFile } from './vfs'
import { profile } from '@/content'

/**
 * Updates document title and meta per open file.
 *
 * NOTE: this is client-side only. Crawlers and link-preview bots see whatever is
 * in index.html. Before launch, pre-render each VFS route to static HTML — see
 * README § Pre-rendering. Without that step the site will not rank for your name.
 */
export function applySeo(file: VFSFile): void {
  document.title = `${profile.name} — ${file.category}`
  setMeta('description', `${file.summary} · ${profile.positioningClaim}`)
  setMeta('og:title', `${profile.name} — ${file.category}`, 'property')
  setMeta('og:description', file.summary, 'property')
}

function setMeta(key: string, content: string, attr: 'name' | 'property' = 'name'): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}
