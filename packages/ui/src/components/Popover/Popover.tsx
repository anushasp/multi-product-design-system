import { useEffect, useRef, type ReactNode } from 'react';
import s from './Popover.module.css';
export interface PopoverProps { anchor: ReactNode; open: boolean; onClose: () => void; children: ReactNode; align?: 'start' | 'end'; }
/** Anchors floating content under its trigger. Closes on Escape and outside click. */
export function Popover({ anchor, open, onClose, children, align = 'end' }: PopoverProps) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const click = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('keydown', key); document.addEventListener('mousedown', click);
    return () => { document.removeEventListener('keydown', key); document.removeEventListener('mousedown', click); };
  }, [open, onClose]);
  return <span ref={ref} className={s.wrap}>{anchor}{open && <span className={[s.float, s[align]].join(' ')}>{children}</span>}</span>;
}
