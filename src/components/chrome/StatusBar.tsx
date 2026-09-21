import type { VFSFile } from '@/lib/vfs'
import { profile } from '@/content'

export function StatusBar({ file, sections }: { file: VFSFile; sections: number }) {
  return (
    <footer className="flex shrink-0 items-center gap-4 border-t border-[var(--border)] bg-[var(--bg-panel)] px-3 py-1 text-[10.5px] text-[var(--text-muted)]">
      <span className="flex items-center gap-1.5">
        <span aria-hidden style={{ color: 'var(--good)' }}>
          ●
        </span>
        {profile.availability.label}
      </span>
      <span className="hidden sm:inline">{file.kind.toUpperCase()}</span>
      <span className="hidden sm:inline">{sections} sections</span>
      <span className="ml-auto">Updated {profile.lastUpdated}</span>
    </footer>
  )
}
