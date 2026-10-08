import { AIMarker } from '../AIMarker/AIMarker';
import s from './Legend.module.css';
export type LegendMark = 'ai' | 'best' | 'empty';
/** Explains marks used in a grid: AI marker, lowest-price highlight, empty value. */
export function Legend({ items }: { items: { mark: LegendMark; label: string }[] }) {
  return (
    <ul className={s.legend}>
      {items.map((i) => (
        <li key={i.label}>{i.mark === 'ai' ? <AIMarker /> : i.mark === 'best' ? <i className={s.best} aria-hidden="true" /> : <span aria-hidden="true">—</span>}{i.label}</li>
      ))}
    </ul>
  );
}
