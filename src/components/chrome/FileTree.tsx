import { buildTree, KIND_COLOR, type VFSFile } from '@/lib/vfs'

const { dirs, rootFiles } = buildTree()

/**
 * The navigation. Real tree semantics — role="tree"/"treeitem" with arrow-key
 * movement — because a fake file tree that a screen reader cannot parse is a
 * worse outcome than a plain list.
 */
export function FileTree({
  active,
  onOpen,
}: {
  active: VFSFile
  onOpen: (file: VFSFile) => void
}) {
  const flat = [...dirs.flatMap((d) => d.files), ...rootFiles]

  const onKeyDown = (e: React.KeyboardEvent, file: VFSFile) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    const i = flat.findIndex((f) => f.path === file.path)
    const next = flat[e.key === 'ArrowDown' ? i + 1 : i - 1]
    if (next) {
      document.getElementById(`tree-${next.path}`)?.focus()
    }
  }

  const row = (file: VFSFile, indent: boolean) => {
    const isActive = active.path === file.path
    return (
      <li key={file.path} role="none">
        <button
          type="button"
          id={`tree-${file.path}`}
          role="treeitem"
          aria-selected={isActive}
          aria-label={`${file.name} — ${file.category}`}
          tabIndex={isActive ? 0 : -1}
          onClick={() => onOpen(file)}
          onKeyDown={(e) => onKeyDown(e, file)}
          className={`flex w-full items-center gap-2 rounded-sm py-[3px] pr-2 text-left text-[12.5px] transition-colors ${
            indent ? 'pl-6' : 'pl-3'
          } ${
            isActive
              ? 'bg-[var(--bg-hover)] text-[var(--text-primary)]'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
          }`}
        >
          <span aria-hidden className={`text-[10px] ${KIND_COLOR[file.kind]}`}>
            ●
          </span>
          <span className="truncate">{file.name}</span>
          {file.action && (
            <span aria-hidden className="ml-auto text-[10px] text-[var(--text-muted)]">
              ↓
            </span>
          )}
        </button>
      </li>
    )
  }

  return (
    <ul role="tree" aria-label="Portfolio sections" className="py-1">
      {dirs.map((dir) => (
        <li key={dir.path} role="none">
          <p
            className="flex items-center gap-1.5 px-3 py-[3px] text-[12px] text-[var(--text-muted)]"
            aria-hidden
          >
            <span>▾</span>
            <span>{dir.name}</span>
          </p>
          <ul role="group">{dir.files.map((f) => row(f, true))}</ul>
        </li>
      ))}
      {rootFiles.map((f) => row(f, false))}
    </ul>
  )
}
