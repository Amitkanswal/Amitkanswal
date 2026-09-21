import type { ReactNode } from 'react'

/**
 * Markdown-lite renderer. Deliberately tiny — it supports exactly what the content
 * modules need and nothing else, which keeps the bundle small and the output
 * predictable. Swap for `react-markdown` if you start writing longer docs.
 *
 * Supports: '# ', '## ', '- ', '> ', fenced ```blocks, blank-line paragraphs,
 * inline `code` and **bold**.
 */
export function Markdown({ source }: { source: string }) {
  const blocks = source.split('\n\n')
  const out: ReactNode[] = []
  let inFence = false
  let fence: string[] = []

  blocks.forEach((block, i) => {
    const trimmed = block.trim()

    if (trimmed.startsWith('```') || inFence) {
      fence.push(block)
      const ticks = (block.match(/```/g) ?? []).length
      inFence = inFence ? ticks === 0 : ticks === 1
      if (!inFence) {
        const code = fence.join('\n\n').replace(/^```[a-z]*\n?/, '').replace(/```$/, '')
        out.push(
          <pre
            key={i}
            className="overflow-x-auto rounded-md border border-[var(--border)] bg-[var(--bg-deep)] p-3 text-[12px] leading-relaxed text-[var(--text-secondary)]"
          >
            <code>{code.trim()}</code>
          </pre>,
        )
        fence = []
      }
      return
    }

    if (trimmed.startsWith('## ')) {
      out.push(
        <h3 key={i} className="mt-2 text-[14px] font-semibold text-[var(--text-primary)]">
          {inline(trimmed.slice(3))}
        </h3>,
      )
    } else if (trimmed.startsWith('# ')) {
      out.push(
        <h2 key={i} className="mt-2 text-[15px] font-semibold text-[var(--text-primary)]">
          {inline(trimmed.slice(2))}
        </h2>,
      )
    } else if (trimmed.startsWith('> ')) {
      out.push(
        <blockquote
          key={i}
          className="border-l-2 border-[var(--border-strong)] pl-3 text-[var(--text-muted)] italic"
        >
          {inline(trimmed.slice(2))}
        </blockquote>,
      )
    } else if (trimmed.startsWith('- ')) {
      out.push(
        <ul key={i} className="ml-1 space-y-1.5">
          {trimmed.split('\n').map((line, j) => (
            <li key={j} className="flex gap-2 text-[var(--text-secondary)]">
              <span aria-hidden className="text-[var(--text-muted)]">
                ·
              </span>
              <span>{inline(line.replace(/^-\s*/, ''))}</span>
            </li>
          ))}
        </ul>,
      )
    } else if (trimmed) {
      out.push(
        <p key={i} className="text-[13px] leading-relaxed text-[var(--text-secondary)]">
          {inline(trimmed)}
        </p>,
      )
    }
  })

  return <div className="space-y-3.5">{out}</div>
}

/** Inline `code` and **bold**. */
function inline(text: string): ReactNode[] {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="rounded border border-[var(--border)] bg-[var(--bg-raised)] px-1 py-px text-[12px] text-[var(--accent)]"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-[var(--text-primary)]">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}
