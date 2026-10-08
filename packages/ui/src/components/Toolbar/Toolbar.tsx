import type { ReactNode } from 'react';
import s from './Toolbar.module.css';
/** Horizontal row of controls. Items in `end` are pushed to the right. Optional top border for bottom bars. */
export function Toolbar({ children, end, bordered, label }: { children?: ReactNode; end?: ReactNode; bordered?: boolean; label?: string }) {
  return <div role="toolbar" aria-label={label} className={[s.bar, bordered && s.bordered].filter(Boolean).join(' ')}>{children}{end && <div className={s.end}>{end}</div>}</div>;
}
