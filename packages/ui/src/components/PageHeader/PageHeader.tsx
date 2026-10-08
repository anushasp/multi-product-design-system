import type { ReactNode } from 'react';
import { StatusChip, type Status } from '../Chips/Chips';
import s from './PageHeader.module.css';
export interface PageHeaderProps { breadcrumb: string; title: string; status?: Status; metric?: { label: string; value: string }; secondaryAction?: ReactNode; primaryAction?: ReactNode; }
/** Figma: Page header. Breadcrumb, title, status, optional metric, one secondary and one primary action. */
export function PageHeader({ breadcrumb, title, status, metric, secondaryAction, primaryAction }: PageHeaderProps) {
  return (
    <div className={s.header}>
      <div className={s.titles}><span className={s.crumb}>{breadcrumb}</span><h1 className={s.title}>{title}</h1></div>
      {status && <StatusChip status={status} />}
      <span className={s.spacer} />
      {metric && <div className={s.metric}><span className={s.label}>{metric.label}</span><b className="gw-num">{metric.value}</b></div>}
      {secondaryAction}{primaryAction}
    </div>
  );
}
