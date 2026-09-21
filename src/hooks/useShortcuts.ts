import { useEffect } from 'react'

export interface ShortcutHandlers {
  onPalette: () => void
  onToggleSidebar: () => void
}

/** ⌘K / Ctrl+K opens the palette, ⌘B / Ctrl+B toggles the sidebar, Esc closes. */
export function useShortcuts({ onPalette, onToggleSidebar }: ShortcutHandlers) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey
      if (!mod) return
      const key = e.key.toLowerCase()
      if (key === 'k' || key === 'p') {
        e.preventDefault()
        onPalette()
      } else if (key === 'b') {
        e.preventDefault()
        onToggleSidebar()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onPalette, onToggleSidebar])
}
