import { useCallback, useEffect, useState } from 'react'
import { DEFAULT_FILE, fileAt, type VFSFile } from '@/lib/vfs'
import { track } from '@/lib/analytics'

const STORAGE_KEY = 'portfolio:open-tabs'

function readUrlFile(): VFSFile {
  if (typeof window === 'undefined') return DEFAULT_FILE
  const param = new URLSearchParams(window.location.search).get('f')
  return (param && fileAt(param)) || DEFAULT_FILE
}

function readStoredTabs(): string[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

/**
 * Tab state. The URL is the source of truth so every file is deep-linkable and
 * shareable; sessionStorage only remembers which tabs were open.
 */
export function useOpenFiles() {
  const [active, setActive] = useState<VFSFile>(readUrlFile)
  const [open, setOpen] = useState<VFSFile[]>(() => {
    const initial = readUrlFile()
    const restored = readStoredTabs()
      .map(fileAt)
      .filter((f): f is VFSFile => Boolean(f))
    return restored.some((f) => f.path === initial.path) ? restored : [initial, ...restored]
  })

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(open.map((f) => f.path)))
    } catch {
      /* private mode — tabs just won't persist */
    }
  }, [open])

  const openFile = useCallback((file: VFSFile) => {
    if (file.action?.type === 'download') {
      track('resume_download', { path: file.path })
      window.open(file.action.href, '_blank', 'noopener')
      return
    }
    setOpen((prev) => (prev.some((f) => f.path === file.path) ? prev : [...prev, file]))
    setActive(file)
    track('file_open', { path: file.path })
    const url = new URL(window.location.href)
    url.searchParams.set('f', file.path)
    url.hash = ''
    window.history.pushState({}, '', url)
  }, [])

  const closeFile = useCallback(
    (file: VFSFile) => {
      setOpen((prev) => {
        const next = prev.filter((f) => f.path !== file.path)
        if (next.length === 0) return [DEFAULT_FILE]
        if (active.path === file.path) setActive(next[next.length - 1])
        return next
      })
    },
    [active.path],
  )

  useEffect(() => {
    const onPop = () => setActive(readUrlFile())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return { open, active, openFile, closeFile }
}
