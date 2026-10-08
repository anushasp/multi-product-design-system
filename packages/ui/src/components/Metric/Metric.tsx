import type { ReactNode } from 'react';
import { Label } from '../Label/Label';
import s from './Metric.module.css';
/** Label + large tabular value, e.g. Bid total $173,762.50. */
export function Metric({ label, value, size = 'md' }: { label: string; value: ReactNode; size?: 'md' | 'lg' }) {
  return <div className={s.metric}><Label>{label}</Label><b className={[s.value, s[size]].join(' ')}>{value}</b></div>;
}
export function MetricGroup({ children }: { children: ReactNode }) { return <div className={s.group}>{children}</div>; }
