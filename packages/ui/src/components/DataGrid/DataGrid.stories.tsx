import type { Meta, StoryObj } from '@storybook/react';
import { DataGrid, GridCell } from './DataGrid';
import { ResourceChip } from '../Chips/Chips';
import { formatMoney } from '../../format';
type Row = { code: string; desc: string; type: 'labor' | 'equipment'; cost: number };
const rows: Row[] = [{ code: 'D6', desc: 'Cat D6 Dozer', type: 'equipment', cost: 1889.04 }, { code: 'L1', desc: 'Laborer, Unskilled', type: 'labor', cost: 1182.96 }];
const meta: Meta = { title: 'Patterns/Data grid' };
export default meta;
export const Grid: StoryObj = { render: () => <DataGrid<Row> caption="Crew" rowKey={(r) => r.code} rows={rows} footer={<span>Total {formatMoney(3072)}</span>} columns={[
  { key: 'type', header: 'Type', render: (r) => <ResourceChip type={r.type} /> }, { key: 'code', header: 'Code', render: (r) => r.code },
  { key: 'desc', header: 'Description', render: (r) => r.desc }, { key: 'cost', header: 'Cost', align: 'right', render: (r) => formatMoney(r.cost) }]} /> };
export const CellVariants: StoryObj = { render: () => <table style={{ borderCollapse: 'collapse' }}><tbody><tr>
  <GridCell align="right">$145.00</GridCell><GridCell align="right" highlight="best" showAI tag="Lowest">$120.00</GridCell><GridCell align="right" highlight="selected">5</GridCell><GridCell align="right">—</GridCell></tr></tbody></table> };
