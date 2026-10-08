import s from './SegmentedControl.module.css';
export interface SegmentedControlProps<T extends string> { options: { value: T; label: string }[]; value: T; onChange: (v: T) => void; label: string; }
/** Figma: Segment (inside a sunken track). Same control on web and iPad; height follows the mode. */
export function SegmentedControl<T extends string>({ options, value, onChange, label }: SegmentedControlProps<T>) {
  return (
    <div role="group" aria-label={label} className={s.track}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={o.value === value} className={s.seg} onClick={() => onChange(o.value)}>{o.label}</button>
      ))}
    </div>
  );
}
