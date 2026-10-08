import { AIMarker } from '../AIMarker/AIMarker';
import { Button } from '../Button/Button';
import s from './AISourcePopover.module.css';
export interface AISourcePopoverProps { title: string; source: string; confidence: 'High' | 'Medium' | 'Low'; level: number; onAccept: () => void; onEdit?: () => void; onViewSource?: () => void; editLabel?: string; viewLabel?: string; }
/** Figma: AI source popover. Source, confidence, Accept / Edit / View source. "Show the work, humans hold the keys." */
export function AISourcePopover({ title, source, confidence, level, onAccept, onEdit, onViewSource, editLabel = 'Edit', viewLabel = 'View source' }: AISourcePopoverProps) {
  return (
    <div role="dialog" aria-label={title} className={s.pop}>
      <div className={s.head}><AIMarker />{title}</div>
      <p className={s.source}>{source}</p>
      <div className={s.conf}><span>Confidence</span><span className={s.meter}><i style={{ width: `${Math.round(level * 100)}%` }} /></span><b>{confidence}</b></div>
      <div className={s.actions}>
        <Button size="sm" onClick={onAccept}>Accept</Button>
        <Button size="sm" variant="secondary" onClick={onEdit}>{editLabel}</Button>
        <Button size="sm" variant="tertiary" onClick={onViewSource}>{viewLabel}</Button>
      </div>
      <p className={s.foot}>After an edit this marker becomes “Revert to AI value”.</p>
    </div>
  );
}
