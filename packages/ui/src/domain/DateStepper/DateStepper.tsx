import { Button } from '../../components/Button/Button';
import { Label } from '../../components/Label/Label';
import s from './DateStepper.module.css';
export interface DateStepperProps { relative?: string; date: string; onPrev?: () => void; onNext?: () => void; }
/** Previous / next day control for field records. Buttons follow size/target (56px in Field). */
export function DateStepper({ relative, date, onPrev, onNext }: DateStepperProps) {
  return (
    <div className={s.wrap}>
      <Button variant="secondary" aria-label="Previous day" onClick={onPrev}>‹</Button>
      <div className={s.date}>{relative && <Label>{relative}</Label>}<b>{date}</b></div>
      <Button variant="secondary" aria-label="Next day" onClick={onNext}>›</Button>
    </div>
  );
}
