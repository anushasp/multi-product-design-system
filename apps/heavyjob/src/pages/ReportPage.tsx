import { useState } from 'react';
import { AIMarker, Button, IPadNavBar, ReviewEntry, Toolbar, TodaysPlan } from '@groundwork/ui';
import { draft, job } from '../data/job';
import s from './Report.module.css';

export function ReportPage({ onBack }: { onBack: () => void }) {
  const [resolved, setResolved] = useState<Record<string, string>>({ qty: 'Accepted' });
  const [submitted, setSubmitted] = useState(false);
  const done = Object.keys(resolved).length;
  const all = done === draft.length;
  return (
    <>
      <IPadNavBar backLabel="Time card" onBack={onBack} title={`Daily report · ${job.id}`} sync={submitted ? 'sent' : 'device'} time="5:06 PM" network="No service · 79%" />
      <div className={s.body}>
        <section className={s.list} aria-label="Draft entries">
          <Toolbar label="Draft" end={<Button variant="secondary" showPlus>Add entry</Button>}>
            <div><h2 className={s.h2}><AIMarker /> Draft from your notes, photos and machines</h2><p className={s.muted} aria-live="polite">{done} of {draft.length} reviewed</p></div>
          </Toolbar>
          {draft.map((e) => (
            <ReviewEntry key={e.id} source={e.source} entry={e.entry} evidence={e.evidence}
              state={resolved[e.id] ? 'accepted' : e.conflict ? 'needs-decision' : 'open'} resolvedLabel={resolved[e.id]}
              primaryLabel={e.conflict?.use ?? 'Accept'} secondaryLabel={e.conflict?.keep ?? 'Edit'}
              onPrimary={() => setResolved((r) => ({ ...r, [e.id]: e.conflict ? e.conflict.use.replace('Use', 'Using') : 'Accepted' }))}
              onSecondary={() => e.conflict && setResolved((r) => ({ ...r, [e.id]: e.conflict!.keep.replace('Keep', 'Kept') }))} />
          ))}
          <Toolbar label="Submit" end={<Button disabled={!all || submitted} onClick={() => setSubmitted(true)}>{submitted ? 'Submitted' : 'Submit report'}</Button>} />
          <p className={s.muted}>Submit unlocks when every entry is reviewed. Nothing is sent without the foreman’s approval.</p>
        </section>
        <aside className={s.plan}>
          <TodaysPlan code="040-201100" activity="Excavation, Scraper"
            stats={[{ label: 'Planned', value: '3,200 CY / shift' }, { label: 'Reported today', value: '500 CY' }, { label: 'Shift', value: '10 hrs' }]}
            installed={{ done: 29382, total: 738897, unit: 'CY' }}
            crew={[...['Cat D6 Dozer', 'Cat D8 Dozer', '3 × Cat 621E Scraper', 'Cat 140B Motorgrader', 'Pickup Truck'].map((label) => ({ type: 'equipment' as const, label })),
              ...['5 × Operator', 'Grade Checker', 'Foreman'].map((label) => ({ type: 'labor' as const, label }))]} />
        </aside>
      </div>
    </>
  );
}
