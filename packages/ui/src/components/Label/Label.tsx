import type { ElementType, ReactNode } from 'react';
import s from './Label.module.css';
/** Eyebrow label: mono, uppercase, muted. Used above metrics, panels and lists. */
export function Label({ children, as: Tag = 'span' }: { children: ReactNode; as?: ElementType }) {
  return <Tag className={s.label}>{children}</Tag>;
}
