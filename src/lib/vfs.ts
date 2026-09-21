/**
 * The VIRTUAL filesystem.
 *
 * This is the site's navigation, not the repo on disk. Each entry is a content
 * category rendered as a file in the sidebar. The extension is a signal, not
 * decoration — it selects the pane renderer and tells the visitor what kind of
 * content to expect.
 *
 * To add a category: add an entry here, and make sure `kind` maps to a pane in
 * components/panes/index.ts. Nothing else needs to change.
 */

export type FileKind = 'md' | 'tsx' | 'rs' | 'json' | 'toml' | 'sh' | 'yml' | 'pdf'

export interface VFSFile {
  /** Unique. Doubles as the URL: /?f=<path> */
  path: string
  /** Directory it appears under in the tree. '' = repo root. */
  dir: string
  name: string
  kind: FileKind
  /** Human label for the category — used in the tab title attribute and a11y text. */
  category: string
  /** One line, shown in the command palette. */
  summary: string
  /** Files with an action do not open a pane; they do the thing. */
  action?: { type: 'download'; href: string }
  /** Opened by default on first visit. Exactly one file should set this. */
  default?: boolean
}

export const VFS: VFSFile[] = [
  {
    path: 'src/README.md',
    dir: 'src',
    name: 'README.md',
    kind: 'md',
    category: 'Landing',
    summary: 'Positioning, availability, and the engineering narrative',
    default: true,
  },
  {
    path: 'src/projects.tsx',
    dir: 'src',
    name: 'projects.tsx',
    kind: 'tsx',
    category: 'Case studies',
    summary: 'Production systems, with metrics, trade-offs and incidents',
  },
  {
    path: 'src/architecture.rs',
    dir: 'src',
    name: 'architecture.rs',
    kind: 'rs',
    category: 'How I think',
    summary: 'Decision heuristics, each wired to the project that proves it',
  },
  {
    path: 'src/career.json',
    dir: 'src',
    name: 'career.json',
    kind: 'json',
    category: 'Timeline',
    summary: 'Roles, promotions, education and recognition',
  },
  {
    path: 'src/skills.toml',
    dir: 'src',
    name: 'skills.toml',
    kind: 'toml',
    category: 'Skills matrix',
    summary: 'Capabilities grouped by category, with honest depth markers',
  },

  {
    path: '.github/workflows/ci.yml',
    dir: '.github/workflows',
    name: 'ci.yml',
    kind: 'yml',
    category: 'Ways of working',
    summary: 'Engineering practices, rendered as the pipeline they are',
  },

  {
    path: 'contact.sh',
    dir: '',
    name: 'contact.sh',
    kind: 'sh',
    category: 'Contact',
    summary: 'How to reach me, and what about',
  },
  {
    path: 'resume.pdf',
    dir: '',
    name: 'resume.pdf',
    kind: 'pdf',
    category: 'Resume',
    summary: 'Download the PDF',
    action: { type: 'download', href: '/resume.pdf' },
  },
]

export const DEFAULT_FILE = VFS.find((f) => f.default) ?? VFS[0]

export function fileAt(path: string): VFSFile | undefined {
  return VFS.find((f) => f.path === path)
}

export interface TreeDir {
  name: string
  path: string
  files: VFSFile[]
}

/** Directories in declaration order, root-level files last. */
export function buildTree(): { dirs: TreeDir[]; rootFiles: VFSFile[] } {
  const dirs: TreeDir[] = []
  for (const file of VFS) {
    if (!file.dir) continue
    let dir = dirs.find((d) => d.path === file.dir)
    if (!dir) {
      dir = { name: file.dir, path: file.dir, files: [] }
      dirs.push(dir)
    }
    dir.files.push(file)
  }
  return { dirs, rootFiles: VFS.filter((f) => !f.dir) }
}

export const KIND_COLOR: Record<FileKind, string> = {
  md: 'text-[var(--f-md)]',
  tsx: 'text-[var(--f-tsx)]',
  rs: 'text-[var(--f-rs)]',
  json: 'text-[var(--f-json)]',
  toml: 'text-[var(--f-toml)]',
  sh: 'text-[var(--f-sh)]',
  yml: 'text-[var(--f-yml)]',
  pdf: 'text-[var(--f-pdf)]',
}
