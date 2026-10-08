import type { Meta, StoryObj } from '@storybook/react';
import { StatusChip, ResourceChip, SyncChip } from './Chips';
const meta: Meta<typeof StatusChip> = { title: 'Base/Chips', component: StatusChip, args: { status: 'in-progress' } };
export default meta;
type S = StoryObj<typeof StatusChip>;
export const Status: S = {};
export const AllStatuses: S = { render: () => <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{(['draft', 'in-progress', 'quoted', 'approved', 'attention'] as const).map((s) => <StatusChip key={s} status={s} />)}</div> };
export const ResourceTypes: S = { render: () => <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{(['labor', 'equipment', 'material', 'subcontractor', 'other'] as const).map((t) => <ResourceChip key={t} type={t} />)}</div> };
export const Sync: S = { render: () => <div style={{ display: 'flex', gap: 8 }}><SyncChip state="device" /><SyncChip state="sent" /></div> };
