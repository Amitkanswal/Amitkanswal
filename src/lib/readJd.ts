/**
 * Client-side job-description reader.
 *
 * The file never leaves the browser. There is no upload, no backend and no form
 * subscription — we extract the text locally and put it in the message the recruiter
 * sends from their own mail client.
 *
 * pdfjs is ~1MB, so it is imported dynamically: the cost is paid only by someone who
 * actually picks a PDF, not by every visitor.
 */

export interface JdResult {
  text: string
  chars: number
  pages?: number
}

const MAX_BYTES = 8 * 1024 * 1024

export async function readJd(file: File): Promise<JdResult> {
  if (file.size > MAX_BYTES) {
    throw new Error('That file is over 8 MB — link it instead, or paste the text.')
  }

  const name = file.name.toLowerCase()

  if (name.endsWith('.pdf')) return readPdf(file)
  if (/\.(txt|md|markdown|rtf)$/.test(name)) {
    const text = clean(await file.text())
    return { text, chars: text.length }
  }

  throw new Error(
    'I can read PDF and plain text in the browser. For .docx, paste the text or drop a link.',
  )
}

async function readPdf(file: File): Promise<JdResult> {
  const pdfjs = await import('pdfjs-dist')
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.mjs',
    import.meta.url,
  ).toString()

  const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise
  const pages: string[] = []

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i)
    const content = await page.getTextContent()
    pages.push(
      content.items
        .map((item) => ('str' in item ? item.str : ''))
        .join(' ')
        .trim(),
    )
  }

  const text = clean(pages.join('\n\n'))
  if (!text) {
    throw new Error('No text in that PDF — it may be a scan. Link it or paste the text.')
  }
  return { text, chars: text.length, pages: doc.numPages }
}

function clean(raw: string): string {
  return raw
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
