import s from './RadioOption.module.css';
/** Read-only selected-option indicator (e.g. the selected vendor in a quote row). */
export function RadioOption({ label, selected = true }: { label: string; selected?: boolean }) {
  return <span className={s.opt}><span className={[s.radio, selected && s.on].filter(Boolean).join(' ')} aria-hidden="true" /><span>{label}</span>{selected && <span className={s.vh}> (selected)</span>}</span>;
}
