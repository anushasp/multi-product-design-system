import { useState } from 'react';
import { Button, CostCode, DateStepper, IPadNavBar, Keypad, KEYS, Label, SegmentedControl, SignOffQuestion, TimeCardGrid, Toolbar, type Answer } from '@groundwork/ui';
import { costCodes, crew, job, signoffQuestions } from '../data/job';
import s from './TimeCard.module.css';

export function TimeCardPage({ onReport }: { onReport: () => void }) {
  const [hours, setHours] = useState<number[][]>(() => crew.map(() => costCodes.map(() => 5)));
  const [col, setCol] = useState(0);
  const [entry, setEntry] = useState('5');
  const [panel, setPanel] = useState<'hours' | 'sign'>('hours');
  const [answers, setAnswers] = useState<Answer[]>(['yes', 'none', 'none']);
  const [sent, setSent] = useState(false);
  const onKey = (k: (typeof KEYS)[number]) => setEntry((p) => (k === '⌫' ? p.slice(0, -1) : p === '0' ? k : (p + k).slice(0, 5)));
  const apply = () => { const n = Number(entry) || 0; setHours((h) => h.map((row) => row.map((v, i) => (i === col ? n : v)))); setSent(false); };
  const signer = crew.findIndex((c) => c.id === 'vega');

  return (
    <>
      <IPadNavBar backLabel="Jobs" title={`Time card · ${job.id} ${job.name}`} sync={sent ? 'sent' : 'device'}
        action={<Button onClick={() => setSent(true)} disabled={sent}>{sent ? 'Sent' : 'Send'}</Button>} />
      <div className={s.datebar}>
        <Toolbar label="Day" end={<><Button variant="tertiary" onClick={onReport}>Daily report ›</Button>
          <SegmentedControl label="Panel" value={panel} onChange={setPanel} options={[{ value: 'hours', label: 'Hours' }, { value: 'sign', label: 'Crew sign-off' }]} /></>}>
          <DateStepper relative="Yesterday" date={job.date} />
        </Toolbar>
      </div>
      <div className={s.body}>
        <TimeCardGrid crew={crew} costCodes={costCodes} hours={hours} selectedColumn={col} onSelectColumn={setCol} summary="Crew · 5 people, 2 machines" />
        <aside className={s.side}>
          {panel === 'hours' ? (
            <>
              <div className={s.sidehead}><Label>Regular hours · {crew.length} rows</Label><CostCode code={costCodes[col].code} /></div>
              <Keypad value={entry} onKey={onKey} onApply={apply} />
            </>
          ) : (
            <>
              <Label>{crew[signer].name} · {hours[signer].reduce((a, b) => a + b, 0)} hrs</Label>
              {signoffQuestions.map((q, i) => <SignOffQuestion key={q.en} english={q.en} spanish={q.es} answer={answers[i]} onAnswer={(a) => setAnswers((x) => x.map((v, j) => (j === i ? a : v)))} />)}
              <Button fullWidth disabled={answers.includes('none')}>Sign · Firmar</Button>
            </>
          )}
        </aside>
      </div>
      <Toolbar bordered label="Time card actions" end={<span className={s.muted}>Revision 6 · syncs automatically when back online</span>}>
        <Button variant="secondary" showPlus>Add crew</Button><Button variant="secondary" showPlus>Add cost code</Button>
      </Toolbar>
    </>
  );
}
