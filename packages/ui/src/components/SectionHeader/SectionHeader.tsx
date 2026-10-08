import type { ReactNode } from 'react';
import { CostCode } from '../CostCode/CostCode';
import s from './SectionHeader.module.css';
export interface SectionHeaderProps { code?: string; title: string; meta?: ReactNode; trailing?: ReactNode; level?: 2 | 3; }
/** Header row for cards and sections: optional cost code, title, muted meta, trailing content. */
export function SectionHeader({ code, title, meta, trailing, level = 3 }: SectionHeaderProps) {
  const H = level === 2 ? 'h2' : 'h3';
  return (
    <div className={s.header}>
      {code && <CostCode code={code} />}
      <H className={[s.title, s[`h${level}`]].join(' ')}>{title}</H>
      {meta && <span className={s.meta}>{meta}</span>}
      {trailing && <span className={s.trailing}>{trailing}</span>}
    </div>
  );
}
