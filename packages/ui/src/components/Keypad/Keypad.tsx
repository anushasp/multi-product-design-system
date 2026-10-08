import s from './Keypad.module.css';
export const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'] as const;
export interface KeypadProps { value: string; unit?: string; onKey: (k: (typeof KEYS)[number]) => void; onApply?: () => void; applyLabel?: string; }
/** Figma: Keypad key x12 + display + apply. One keypad everywhere in HeavyJob. */
export function KeypadKey({ k, onKey }: { k: (typeof KEYS)[number]; onKey: KeypadProps['onKey'] }) {
  return <button type="button" className={s.key} onClick={() => onKey(k)} aria-label={k === '⌫' ? 'Delete' : k}>{k}</button>;
}
export function Keypad({ value, unit = 'hrs', onKey, onApply, applyLabel = 'Apply to column' }: KeypadProps) {
  return (
    <div className={s.keypad}>
      <output className={s.display}><span>{value || '0'}</span><small>{unit}</small></output>
      <div className={s.keys}>{KEYS.map((k) => <KeypadKey key={k} k={k} onKey={onKey} />)}</div>
      {onApply && <button type="button" className={s.apply} onClick={onApply}>{applyLabel}</button>}
    </div>
  );
}
