import { useEffect, useState } from 'react'

export interface OutlineItem {
  id: string
  label: string
  depth: number
}

/**
 * Drives the outline panel: scans the pane for [data-outline] nodes whenever the
 * active file changes, then tracks which one is in view.
 */
export function useActiveSection(containerId: string, dependency: string) {
  const [items, setItems] = useState<OutlineItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return

    const nodes = Array.from(container.querySelectorAll<HTMLElement>('[data-outline]'))
    setItems(
      nodes.map((n) => ({
        id: n.id,
        label: n.dataset.outline ?? n.textContent ?? '',
        depth: Number(n.dataset.outlineDepth ?? 1),
      })),
    )
    setActiveId(nodes[0]?.id ?? '')

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0 },
    )
    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [containerId, dependency])

  return { items, activeId }
}
