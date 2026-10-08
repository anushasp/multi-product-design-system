import s from './HoursCell.module.css';
export interface HoursCellProps { value: number | string; selected?: boolean; onSelect?: () => void; label: string; }
/** Figma: Hours cell. Big tabular number (size/number), Selected marks the column the keypad edits. */
export function HoursCell({ value, selected, onSelect, label }: HoursCellProps) {
  return (
    <td className={s.td}>
      <button type="button" className={s.cell} aria-pressed={selected} aria-label={`${label}: ${value} hours`} onClick={onSelect}>{value}</button>
    </td>
  );
}
