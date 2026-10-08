import { CostCode } from '../../components/CostCode/CostCode';
import { HoursCell } from '../../components/HoursCell/HoursCell';
import { Label } from '../../components/Label/Label';
import { CrewMemberCell, type CrewMember } from '../CrewMemberCell/CrewMemberCell';
import s from './TimeCardGrid.module.css';
export interface CostCodeColumn { code: string; description: string; quantity: string; }
export interface TimeCardGridProps { crew: CrewMember[]; costCodes: CostCodeColumn[]; hours: number[][]; selectedColumn: number; onSelectColumn: (i: number) => void; summary?: string; }
/** Crew x cost-code hours grid. Selecting a header or cell selects the column the keypad edits. */
export function TimeCardGrid({ crew, costCodes, hours, selectedColumn, onSelectColumn, summary }: TimeCardGridProps) {
  return (
    <div className={s.wrap}>
      <table className={s.grid}>
        <caption className={s.vh}>Hours by crew member and cost code</caption>
        <thead><tr>
          <th scope="col"><Label>{summary ?? `Crew · ${crew.length} rows`}</Label></th>
          {costCodes.map((c, i) => (
            <th key={c.code} scope="col" aria-selected={i === selectedColumn}>
              <button type="button" className={s.cchead} onClick={() => onSelectColumn(i)}><CostCode code={c.code} /><span className={s.muted}>{c.description}</span><b>{c.quantity}</b></button>
            </th>))}
          <th scope="col" className={s.center}><Label>Total hrs</Label></th>
        </tr></thead>
        <tbody>
          {crew.map((m, r) => (
            <tr key={m.id}>
              <CrewMemberCell member={m} />
              {costCodes.map((c, i) => <HoursCell key={c.code} label={`${m.name}, ${c.code}`} value={hours[r][i]} selected={i === selectedColumn} onSelect={() => onSelectColumn(i)} />)}
              <td className={s.total}>{hours[r].reduce((a, b) => a + b, 0)}</td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}
