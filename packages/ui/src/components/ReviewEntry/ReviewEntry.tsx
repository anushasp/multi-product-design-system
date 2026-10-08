import type { ReactNode } from 'react';
import { Button } from '../Button/Button';
import { StatusChip } from '../Chips/Chips';
import s from './ReviewEntry.module.css';
export type EntryState = 'open' | 'accepted' | 'needs-decision';
export interface ReviewEntryProps { state: EntryState; source: 'Voice' | 'Photo' | 'Machine'; entry: ReactNode; evidence: ReactNode; primaryLabel?: string; secondaryLabel?: string; onPrimary?: () => void; onSecondary?: () => void; resolvedLabel?: string; }
/** Figma: Review entry. One item of an AI agent draft; each item is accepted individually. */
export function ReviewEntry({ state, source, entry, evidence, primaryLabel = 'Accept', secondaryLabel = 'Edit', onPrimary, onSecondary, resolvedLabel = 'Accepted' }: ReviewEntryProps) {
  return (
    <article className={[s.entry, s[state]].join(' ')}>
      <span className={s.source}>{source}</span>
      <div className={s.text}>
        <p className={s.main}>{entry}</p>
        <p className={s.evidence}>{state === 'needs-decision' && <StatusChip status="attention" label="Needs a decision" />}{evidence}</p>
      </div>
      <div className={s.actions}>
        {state === 'accepted'
          ? <span className={s.done}>✓ {resolvedLabel}</span>
          : <><Button variant="secondary" onClick={onSecondary}>{secondaryLabel}</Button><Button onClick={onPrimary}>{primaryLabel}</Button></>}
      </div>
    </article>
  );
}
