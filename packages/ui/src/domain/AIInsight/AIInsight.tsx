import type { ReactNode } from 'react';
import { AIMarker } from '../../components/AIMarker/AIMarker';
import s from './AIInsight.module.css';
export interface AIInsightProps { title: string; items: ReactNode[]; source: string; actions?: ReactNode; }
/** AI-generated summary card. Always names its source and offers a way to check it. */
export function AIInsight({ title, items, source, actions }: AIInsightProps) {
  return (
    <section className={s.card} aria-label={title}>
      <h3 className={s.title}><AIMarker />{title}</h3>
      <ul className={s.items}>{items.map((it, i) => <li key={i}>{it}</li>)}</ul>
      <span className={s.source}>Source: {source}</span>
      {actions && <div className={s.actions}>{actions}</div>}
    </section>
  );
}
