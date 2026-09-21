import type { ComponentType } from 'react'
import type { FileKind, VFSFile } from '@/lib/vfs'
import { MarkdownPane } from './MarkdownPane'
import { ProjectsPane } from './ProjectsPane'
import { PrinciplesPane } from './PrinciplesPane'
import { JsonPane } from './JsonPane'
import { TomlPane } from './TomlPane'
import { ShellPane } from './ShellPane'

export type PaneComponent = ComponentType<{ file: VFSFile }>

/**
 * File type → renderer. Adding a content category is a data change in lib/vfs.ts;
 * only a genuinely new *kind* of content needs a new pane here.
 */
export const PANES: Partial<Record<FileKind, PaneComponent>> = {
  md: MarkdownPane,
  yml: MarkdownPane,
  tsx: ProjectsPane,
  rs: PrinciplesPane,
  json: JsonPane,
  toml: TomlPane,
  sh: ShellPane,
}
