import s from './ProgressBar.module.css';
export interface ProgressBarProps { segments: { value: number; color?: string }[]; label: string; }
/** Single or stacked progress bar. Segment colors must be token vars, e.g. var(--resource-chip-labor). */
export function ProgressBar({ segments, label }: ProgressBarProps) {
  return <div className={s.track} role="img" aria-label={label}>{segments.map((seg, i) => <i key={i} style={{ width: `${seg.value * 100}%`, background: seg.color ?? 'var(--progress-fill)' }} />)}</div>;
}
