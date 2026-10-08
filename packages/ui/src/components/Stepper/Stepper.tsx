import s from './Stepper.module.css';
export type StepState = 'done' | 'current' | 'upcoming';
/** Figma: Stepper step, composed into a stepper. */
export function Stepper({ steps, label }: { steps: { label: string; state: StepState }[]; label: string }) {
  return (
    <ol className={s.stepper} aria-label={label}>
      {steps.map((st, i) => (
        <li key={st.label} className={[s.step, s[st.state]].join(' ')} aria-current={st.state === 'current' ? 'step' : undefined}>
          <span className={s.n}>{st.state === 'done' ? '✓' : i + 1}</span>{st.label}
        </li>
      ))}
    </ol>
  );
}
