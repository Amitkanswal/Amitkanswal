import { useEffect, useMemo, useRef, useState } from 'react'
import { VFS, type VFSFile } from '@/lib/vfs'

export function CommandPalette({
  open,
  onClose,
  onOpenFile,
}: {
  open: boolean
  onClose: () => void
  onOpenFile: (f: VFSFile) => void
}) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return VFS
    return VFS.filter((f) =>
      `${f.path} ${f.category} ${f.summary}`.toLowerCase().includes(q),
    )
  }, [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  if (!open) return null

  const choose = (file: VFSFile) => {
    onOpenFile(file)
    onClose()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[index]) {
      e.preventDefault()
      choose(results[index])
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[12vh]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Go to section"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
        className="w-[min(560px,92vw)] overflow-hidden rounded-lg border border-[var(--border-strong)] bg-[var(--bg-panel)] shadow-2xl"
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIndex(0)
          }}
          placeholder="Type a section or file name…"
          aria-label="Search sections"
          className="w-full border-b border-[var(--border)] bg-transparent px-4 py-3 text-[13px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
        />
        <ul className="max-h-[50vh] overflow-y-auto py-1">
          {results.length === 0 && (
            <li className="px-4 py-3 text-[12px] text-[var(--text-muted)]">No matches</li>
          )}
          {results.map((file, i) => (
            <li key={file.path}>
              <button
                type="button"
                onMouseEnter={() => setIndex(i)}
                onClick={() => choose(file)}
                className={`flex w-full flex-col items-start gap-0.5 px-4 py-2 text-left ${
                  i === index ? 'bg-[var(--bg-hover)]' : ''
                }`}
              >
                <span className="text-[12.5px] text-[var(--text-primary)]">
                  {file.category}
                  <span className="ml-2 text-[var(--text-muted)]">{file.path}</span>
                </span>
                <span className="text-[11px] text-[var(--text-muted)]">{file.summary}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
