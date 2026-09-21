const ITEMS = [
  { id: 'files', glyph: '▤', label: 'Explorer' },
  { id: 'search', glyph: '⌕', label: 'Search' },
  { id: 'git', glyph: '⑂', label: 'Source control' },
  { id: 'docs', glyph: '✎', label: 'Writing' },
]

export function ActivityBar({
  onSearch,
  theme,
  onToggleTheme,
}: {
  onSearch: () => void
  theme: string
  onToggleTheme: () => void
}) {
  return (
    <nav
      aria-label="Activity"
      className="hidden w-12 shrink-0 flex-col items-center justify-between border-r border-[var(--border)] bg-[var(--bg-panel)] py-3 md:flex"
    >
      <ul className="flex flex-col items-center gap-1">
        {ITEMS.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={item.id === 'search' ? onSearch : undefined}
              aria-label={item.label}
              title={item.label}
              className={`flex size-9 items-center justify-center rounded text-[17px] transition-colors ${
                i === 0
                  ? 'text-[var(--text-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span aria-hidden>{item.glyph}</span>
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        title="Toggle theme"
        className="flex size-9 items-center justify-center rounded text-[15px] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
      >
        <span aria-hidden>{theme === 'dark' ? '☾' : '☀'}</span>
      </button>
    </nav>
  )
}
