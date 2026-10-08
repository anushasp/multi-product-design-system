import type { ReactNode } from 'react';
import s from './StatRow.module.css';
/** Figma: Stat row. Label / value pair for summaries. */
export function StatRow({ label, value }: { label: string; value: ReactNode }) {
  return <div className={s.row}><span className={s.label}>{label}</span><b className={s.value}>{value}</b></div>;
}
