import type { VFSFile } from '@/lib/vfs'

export function Breadcrumb({ file }: { file: VFSFile }) {
  const parts = file.path.split('/')
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex shrink-0 items-center gap-1.5 border-b border-[var(--border)] bg-[var(--bg-surface)] px-4 py-1.5 text-[11px] text-[var(--text-muted)]"
    >
      {parts.map((part, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden>›</span>}
          <span className={i === parts.length - 1 ? 'text-[var(--text-secondary)]' : undefined}>
            {part}
          </span>
        </span>
      ))}
      <span className="ml-auto hidden sm:inline">{file.category}</span>
    </nav>
  )
}
