import { ResourceChip, type ResourceType } from '../../components/Chips/Chips';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { formatMoney } from '../../format';
import s from './CostBreakdown.module.css';
const LABEL: Record<ResourceType, string> = { labor: 'Labor', equipment: 'Equipment', material: 'Material', subcontractor: 'Subcontract', other: 'Other' };
/** Stacked bar + legend of cost by resource type. Colors come from resource-chip tokens, same as the grid chips. */
export function CostBreakdown({ costs }: { costs: Partial<Record<ResourceType, number>> }) {
  const entries = (Object.keys(LABEL) as ResourceType[]).map((t) => [t, costs[t] ?? 0] as const);
  const total = entries.reduce((a, [, v]) => a + v, 0) || 1;
  const shown = entries.filter(([t, v]) => v > 0 || t === 'material' || t === 'subcontractor');
  return (
    <div className={s.wrap}>
      <ProgressBar label={entries.filter(([, v]) => v > 0).map(([t, v]) => `${LABEL[t]} ${Math.round((v / total) * 100)}%`).join(', ')}
        segments={entries.filter(([, v]) => v > 0).map(([t, v]) => ({ value: v / total, color: `var(--resource-chip-${t})` }))} />
      <div className={s.legend}>{shown.map(([t, v]) => <ResourceChip key={t} type={t} label={`${LABEL[t]} ${formatMoney(v)}`} />)}</div>
    </div>
  );
}
