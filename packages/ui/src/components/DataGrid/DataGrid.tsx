import type { ReactNode } from 'react';
import { AIMarker } from '../AIMarker/AIMarker';
import s from './DataGrid.module.css';

export type Highlight = 'none' | 'best' | 'selected';
export interface GridCellProps { kind?: 'header' | 'body'; align?: 'left' | 'right'; highlight?: Highlight; showAI?: boolean; onAIClick?: () => void; aiExpanded?: boolean; tag?: string; width?: string; children?: ReactNode; }
/** Figma: Grid cell (Kind x Align x Highlight, Show AI, Show tag). */
export function GridCell({ kind = 'body', align = 'left', highlight = 'none', showAI, onAIClick, aiExpanded, tag, width, children }: GridCellProps) {
  const Tag = kind === 'header' ? 'th' : 'td';
  return (
    <Tag className={[s.cell, s[kind], s[align], s[highlight]].join(' ')} style={width ? { width } : undefined} scope={kind === 'header' ? 'col' : undefined}>
      <span className={s.inner}>
        {showAI && <AIMarker onClick={onAIClick} expanded={aiExpanded} />}
        <span>{children}</span>
        {tag && <span className={s.tag}>{tag}</span>}
      </span>
    </Tag>
  );
}

export interface Column<T> { key: string; header: string; align?: 'left' | 'right'; width?: string; render: (row: T) => ReactNode; cell?: (row: T) => Partial<GridCellProps>; }
export interface DataGridProps<T> { columns: Column<T>[]; rows: T[]; rowKey: (row: T) => string; footer?: ReactNode; caption?: string; }
/** Data grid composed from GridCell: tabular numbers, right-aligned values, em dash for empty. */
export function DataGrid<T>({ columns, rows, rowKey, footer, caption }: DataGridProps<T>) {
  return (
    <div className={s.scroll}>
      <table className={s.grid}>
        {caption && <caption className={s.caption}>{caption}</caption>}
        <thead><tr>{columns.map((c) => <GridCell key={c.key} kind="header" align={c.align} width={c.width}>{c.header}</GridCell>)}</tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={rowKey(r)}>{columns.map((c) => <GridCell key={c.key} align={c.align} {...c.cell?.(r)}>{c.render(r)}</GridCell>)}</tr>
          ))}
        </tbody>
        {footer && <tfoot><tr><td colSpan={columns.length} className={s.footer}>{footer}</td></tr></tfoot>}
      </table>
    </div>
  );
}
