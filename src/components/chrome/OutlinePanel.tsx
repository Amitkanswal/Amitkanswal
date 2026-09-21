import type { OutlineItem } from '@/hooks/useActiveSection'

export function OutlinePanel({
  items,
  activeId,
}: {
  items: OutlineItem[]
  activeId: string
}) {
  if (items.length === 0) return null

  return (
    <aside
      aria-label="Outline"
      className="hidden w-56 shrink-0 overflow-y-auto border-l border-[var(--border)] bg-[var(--bg-panel)] xl:block"
    >
      <p className="px-3 py-2.5 text-[10px] font-semibold tracking-[0.1em] text-[var(--text-muted)] uppercase">
        Outline · {items.length}
      </p>
      <ul className="pb-4">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={item.id === activeId ? 'location' : undefined}
              className={`block border-l-2 py-1 pr-2 text-[11.5px] transition-colors ${
                item.id === activeId
                  ? 'border-[var(--accent)] bg-[var(--bg-hover)] text-[var(--text-primary)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
              style={{ paddingLeft: `${8 + item.depth * 8}px` }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
