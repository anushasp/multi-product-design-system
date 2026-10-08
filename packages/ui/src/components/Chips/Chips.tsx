import s from './Chips.module.css';

export type Status = 'draft' | 'in-progress' | 'quoted' | 'approved' | 'attention';
const STATUS_LABEL: Record<Status, string> = { draft: 'Draft', 'in-progress': 'In progress', quoted: 'Quoted', approved: 'Approved', attention: 'Needs attention' };

/** Figma: Status chip. One status scale for bids, quotes, time cards and agent output. Color + text, never color alone. */
export function StatusChip({ status, label }: { status: Status; label?: string }) {
  return <span className={[s.chip, s.status].join(' ')} style={{ ['--c' as string]: `var(--status-chip-${status})` }}><i className={s.dot} />{label ?? STATUS_LABEL[status]}</span>;
}

export type ResourceType = 'labor' | 'equipment' | 'material' | 'subcontractor' | 'other';
const RESOURCE_LABEL: Record<ResourceType, string> = { labor: 'Labor', equipment: 'Equipment', material: 'Material', subcontractor: 'Subcontract', other: 'Other' };

/** Figma: Resource chip. Same colors in the estimate and on the job site. */
export function ResourceChip({ type, label, mono }: { type: ResourceType; label?: string; mono?: boolean }) {
  return <span className={[s.chip, s.resource].join(' ')} style={{ ['--c' as string]: `var(--resource-chip-${type})` }}><i className={s.square} /><span className={mono ? s.mono : undefined}>{label ?? RESOURCE_LABEL[type]}</span></span>;
}

/** Figma: Sync chip. Shown on every field record. */
export function SyncChip({ state }: { state: 'device' | 'sent' }) {
  return <span className={[s.sync, s[state]].join(' ')}><i className={s.dot} />{state === 'device' ? 'Saved on device' : 'Sent'}</span>;
}
