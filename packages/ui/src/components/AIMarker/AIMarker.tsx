import s from './AIMarker.module.css';
export interface AIMarkerProps { onClick?: () => void; expanded?: boolean; label?: string; }
/** Figma: AI marker. The only marker for AI-produced values; clickable when it opens an AISourcePopover. */
export function AIMarker({ onClick, expanded, label = 'AI-generated, show source' }: AIMarkerProps) {
  const content = (<><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M5 0l1.2 3.8L10 5 6.2 6.2 5 10 3.8 6.2 0 5l3.8-1.2z" fill="currentColor" /></svg>AI</>);
  return onClick
    ? <button type="button" className={s.ai} onClick={onClick} aria-expanded={expanded} aria-label={label}>{content}</button>
    : <span className={s.ai} aria-label="AI-generated">{content}</span>;
}
