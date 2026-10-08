import s from './SignOffQuestion.module.css';
export type Answer = 'none' | 'yes' | 'no';
export interface SignOffQuestionProps { english: string; spanish: string; answer: Answer; onAnswer: (a: Answer) => void; }
/** Figma: Sign-off question. Crew language under English; full-width Yes / No; selected shows a check, not color alone. */
export function SignOffQuestion({ english, spanish, answer, onAnswer }: SignOffQuestionProps) {
  return (
    <fieldset className={s.q}>
      <legend className={s.en}>{english}<span className={s.es} lang="es">{spanish}</span></legend>
      <div className={s.yn}>
        <button type="button" aria-pressed={answer === 'yes'} onClick={() => onAnswer('yes')}>{answer === 'yes' && '✓ '}Yes · Sí</button>
        <button type="button" aria-pressed={answer === 'no'} onClick={() => onAnswer('no')}>{answer === 'no' && '✓ '}No</button>
      </div>
    </fieldset>
  );
}
