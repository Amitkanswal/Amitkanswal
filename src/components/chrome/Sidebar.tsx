import type { VFSFile } from '@/lib/vfs'
import { FileTree } from './FileTree'
import { TelemetryPanel } from './TelemetryPanel'

export function Sidebar({
  active,
  onOpen,
}: {
  active: VFSFile
  onOpen: (file: VFSFile) => void
}) {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r border-[var(--border)] bg-[var(--bg-panel)]">
      <p className="px-3 py-2.5 text-[10px] font-semibold tracking-[0.1em] text-[var(--text-muted)] uppercase">
        Explorer
      </p>
      <div className="flex-1">
        <FileTree active={active} onOpen={onOpen} />
      </div>
      <TelemetryPanel />
    </div>
  )
}
