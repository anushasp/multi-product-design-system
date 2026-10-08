import s from './Switch.module.css';
export interface SwitchProps { checked: boolean; onChange: (v: boolean) => void; label: string; }
/** Figma: Switch. Off state keeps a visible outline and an ON/OFF label. */
export function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <button type="button" role="switch" aria-checked={checked} className={s.sw} onClick={() => onChange(!checked)}>
      <span className={s.track} /><span>{label}</span><span className={s.state}>{checked ? 'On' : 'Off'}</span>
    </button>
  );
}
