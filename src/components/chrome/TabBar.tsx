import { KIND_COLOR, type VFSFile } from '@/lib/vfs'

export function TabBar({
  open,
  active,
  onSelect,
  onClose,
}: {
  open: VFSFile[]
  active: VFSFile
  onSelect: (f: VFSFile) => void
  onClose: (f: VFSFile) => void
}) {
  return (
    <div
      role="tablist"
      aria-label="Open sections"
      className="flex shrink-0 overflow-x-auto border-b border-[var(--border)] bg-[var(--bg-panel)]"
    >
      {open.map((file) => {
        const isActive = file.path === active.path
        return (
          <div
            key={file.path}
            className={`group flex shrink-0 items-center gap-2 border-r border-[var(--border)] pr-1.5 pl-3 ${
              isActive ? 'bg-[var(--bg-surface)]' : 'bg-transparent'
            }`}
          >
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(file)}
              className={`flex items-center gap-2 py-2 text-[12px] ${
                isActive
                  ? 'text-[var(--text-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
            >
              <span aria-hidden className={`text-[9px] ${KIND_COLOR[file.kind]}`}>
                ●
              </span>
              {file.name}
            </button>
            <button
              type="button"
              onClick={() => onClose(file)}
              aria-label={`Close ${file.name}`}
              className="rounded px-1 text-[13px] text-transparent group-hover:text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:!text-[var(--text-primary)]"
            >
              <span aria-hidden>×</span>
            </button>
          </div>
        )
      })}
    </div>
  )
}
