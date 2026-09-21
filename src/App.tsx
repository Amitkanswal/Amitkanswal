import { useCallback, useState } from 'react'
import { ActivityBar } from './components/chrome/ActivityBar'
import { Sidebar } from './components/chrome/Sidebar'
import { TabBar } from './components/chrome/TabBar'
import { Breadcrumb } from './components/chrome/Breadcrumb'
import { OutlinePanel } from './components/chrome/OutlinePanel'
import { StatusBar } from './components/chrome/StatusBar'
import { CommandPalette } from './components/chrome/CommandPalette'
import { Terminal } from './components/chrome/Terminal'
import { PANES } from './components/panes'
import { useOpenFiles } from './hooks/useOpenFiles'
import { useTheme } from './hooks/useTheme'
import { useShortcuts } from './hooks/useShortcuts'
import { useActiveSection } from './hooks/useActiveSection'
import { profile } from './content'

const PANE_ID = 'editor-pane'

export default function App() {
  const { open, active, openFile, closeFile } = useOpenFiles()
  const { theme, toggle } = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { items, activeId } = useActiveSection(PANE_ID, active.path)

  const onPalette = useCallback(() => setPaletteOpen(true), [])
  const onToggleSidebar = useCallback(() => setSidebarOpen((v) => !v), [])
  useShortcuts({ onPalette, onToggleSidebar })

  const Pane = PANES[active.kind]

  return (
    <div className="flex h-full flex-col bg-[var(--bg-deep)]">
      <a href={`#${PANE_ID}`} className="skip-link">
        Skip to content
      </a>

      {/* Title bar */}
      <header className="flex shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[var(--bg-panel)] px-3 py-1.5">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle explorer"
          aria-expanded={sidebarOpen}
          className="rounded px-1.5 py-0.5 text-[13px] text-[var(--text-muted)] hover:text-[var(--text-primary)] md:hidden"
        >
          <span aria-hidden>☰</span>
        </button>

        <span className="truncate text-[11.5px] text-[var(--text-secondary)]">
          {profile.name.toLowerCase().replace(/\s+/g, '-')} / portfolio
        </span>

        <button
          type="button"
          onClick={onPalette}
          className="mx-auto hidden w-[min(420px,40vw)] items-center gap-2 rounded border border-[var(--border)] bg-[var(--bg-surface)] px-2.5 py-1 text-[11.5px] text-[var(--text-muted)] hover:border-[var(--border-strong)] sm:flex"
        >
          <span aria-hidden>⌕</span>
          <span>Type a section or file name…</span>
          <kbd className="ml-auto rounded border border-[var(--border)] px-1 text-[10px]">⌘K</kbd>
        </button>

        <button
          type="button"
          onClick={toggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          className="rounded px-1.5 py-0.5 text-[13px] text-[var(--text-muted)] hover:text-[var(--text-primary)] md:hidden"
        >
          <span aria-hidden>{theme === 'dark' ? '☾' : '☀'}</span>
        </button>
      </header>

      <div className="flex min-h-0 flex-1">
        <ActivityBar onSearch={onPalette} theme={theme} onToggleTheme={toggle} />

        {/* Desktop sidebar */}
        <div className="hidden w-60 shrink-0 md:block">
          <Sidebar active={active} onOpen={openFile} />
        </div>

        {/* Mobile sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div className="w-64 max-w-[80vw]">
              <Sidebar
                active={active}
                onOpen={(f) => {
                  openFile(f)
                  setSidebarOpen(false)
                }}
              />
            </div>
            <button
              type="button"
              aria-label="Close explorer"
              onClick={() => setSidebarOpen(false)}
              className="flex-1 bg-black/50"
            />
          </div>
        )}

        {/* Editor column */}
        <div className="flex min-w-0 flex-1 flex-col bg-[var(--bg-surface)]">
          <TabBar open={open} active={active} onSelect={openFile} onClose={closeFile} />
          <Breadcrumb file={active} />

          <main id={PANE_ID} className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
            <div className="mx-auto max-w-4xl">
              {Pane ? (
                <Pane file={active} />
              ) : (
                <p className="text-[var(--text-muted)]">
                  No renderer registered for <code>{active.kind}</code>.
                </p>
              )}
            </div>
          </main>

          <Terminal />
        </div>

        <OutlinePanel items={items} activeId={activeId} />
      </div>

      <StatusBar file={active} sections={items.length} />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpenFile={openFile}
      />
    </div>
  )
}
