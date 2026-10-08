import { ResourceChip, type ResourceType } from '../../components/Chips/Chips';
import { CostCode } from '../../components/CostCode/CostCode';
import { Label } from '../../components/Label/Label';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { StatRow } from '../../components/StatRow/StatRow';
import s from './TodaysPlan.module.css';
export interface TodaysPlanProps { code: string; activity: string; stats: { label: string; value: string }[]; installed: { done: number; total: number; unit: string }; crew: { type: ResourceType; label: string }[]; }
/** Structured plan sent from the HeavyBid estimate to HeavyJob (replaces fixed-width estimate notes). */
export function TodaysPlan({ code, activity, stats, installed, crew }: TodaysPlanProps) {
  const pct = installed.done / installed.total;
  return (
    <section className={s.plan} aria-label="Today's plan">
      <Label>Today’s plan · from the estimate</Label>
      <CostCode code={code} />
      <h3 className={s.title}>{activity}</h3>
      {stats.map((st) => <StatRow key={st.label} label={st.label} value={st.value} />)}
      <StatRow label="Installed to date" value={`${installed.done.toLocaleString('en-US')} / ${installed.total.toLocaleString('en-US')} ${installed.unit}`} />
      <ProgressBar label={`${Math.round(pct * 100)}% installed`} segments={[{ value: pct }]} />
      <Label>Planned crew</Label>
      <div className={s.chips}>{crew.map((c) => <ResourceChip key={c.label} type={c.type} label={c.label} />)}</div>
    </section>
  );
}
