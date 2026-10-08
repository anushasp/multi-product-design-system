import type { ReactNode } from 'react';
import { SyncChip } from '../Chips/Chips';
import { Button } from '../Button/Button';
import s from './IPadNavBar.module.css';
export interface IPadNavBarProps { backLabel: string; onBack?: () => void; title: string; sync?: 'device' | 'sent'; action?: ReactNode; time?: string; network?: string; }
/** Figma: iPad nav bar. Back, centered title, sync state (always visible on field screens), optional action. */
export function IPadNavBar({ backLabel, onBack, title, sync = 'device', action, time = '4:42 PM', network = 'LTE · 82%' }: IPadNavBarProps) {
  return (
    <div className={s.wrap}>
      <div className={s.status} aria-hidden="true"><span>{time}</span><span>{network}</span></div>
      <div className={s.nav}>
        <Button variant="tertiary" onClick={onBack}>‹ {backLabel}</Button>
        <h1 className={s.title}>{title}</h1>
        <SyncChip state={sync} />
        {action}
      </div>
    </div>
  );
}
