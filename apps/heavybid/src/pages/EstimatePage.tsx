import { useState } from 'react';
import { AIInsight, Button, Card, CostBreakdown, DataGrid, Label, Metric, MetricGroup, PageHeader, PayItemList, ResourceChip, SectionHeader, formatMoney, formatQty } from '@groundwork/ui';
import { bidTotal, crew, payItems, type CrewResource } from '../data/estimate';
import s from './Estimate.module.css';

export function EstimatePage() {
  const [selected, setSelected] = useState('100001');
  const labor = crew.filter((r) => r.type === 'labor').reduce((a, r) => a + r.cost, 0);
  const equipment = crew.filter((r) => r.type === 'equipment').reduce((a, r) => a + r.cost, 0);
  const total = labor + equipment;
  return (
    <>
      <PageHeader breadcrumb="Estimates / STB001" title="Downtown Eastside Drainage" status="in-progress" metric={{ label: 'Bid total', value: formatMoney(bidTotal) }}
        secondaryAction={<Button variant="secondary">Review</Button>} primaryAction={<Button>Generate proposal</Button>} />
      <div className={s.layout}>
        <PayItemList items={payItems} selected={selected} onSelect={setSelected} total={bidTotal} />
        <main className={s.main}>
          <Card className={s.stack}>
            <SectionHeader level={2} code="100001" title="Clear & Grub - Heavy" meta={`${formatQty(3000, 'EA')} CY`}
              trailing={<MetricGroup><Metric label="Cost" value={formatMoney(total)} /><Metric label="Markup" value={formatMoney(0)} /><Metric label="Price" value={formatMoney(total)} /></MetricGroup>} />
            <CostBreakdown costs={{ labor, equipment }} />
          </Card>
          <Card padded={false}>
            <div className={s.cardhead}><SectionHeader code="CLH" title="Heavy Clearing crew" meta="3.00 shifts · 8.00 hrs/shift · 24.00 crew hrs" trailing={<b>$5.14 / CY</b>} /></div>
            <DataGrid<CrewResource> caption="Heavy Clearing crew resources" rows={crew} rowKey={(r) => r.code}
              footer={<div className={s.gridfoot}><Button variant="tertiary" showPlus>Add resource</Button><span>Crew total <span className="gw-num">{formatMoney(total)}</span></span></div>}
              columns={[
                { key: 'type', header: 'Type', render: (r) => <ResourceChip type={r.type} /> },
                { key: 'code', header: 'Code', render: (r) => r.code },
                { key: 'desc', header: 'Description', width: '100%', render: (r) => r.description },
                { key: 'pieces', header: 'Pieces', align: 'right', render: (r) => formatQty(r.pieces, 'HR') },
                { key: 'hours', header: 'Hours', align: 'right', render: (r) => formatQty(r.hours, 'HR') },
                { key: 'unit', header: 'Unit cost', align: 'right', render: (r) => formatMoney(r.unitCost) },
                { key: 'actual', header: 'Actual unit', align: 'right', render: (r) => formatMoney(r.actualUnit) },
                { key: 'cost', header: 'Cost', align: 'right', render: (r) => formatMoney(r.cost) },
              ]} />
          </Card>
        </main>
        <aside className={s.aside} aria-label="Assistant">
          <AIInsight title="Changes since yesterday" source="estimate audit log, 2 entries"
            items={[<>Pay item <b>300</b> unit price set to <b className="gw-num">$115.00</b> (suggested $109.16).</>, <>Pay item <b>100</b> unit price set to <b className="gw-num">$6.00</b> (suggested $5.94).</>]}
            actions={<><Button variant="secondary" size="sm">Open audit log</Button><Button variant="tertiary" size="sm">Not helpful</Button></>} />
          <Card className={s.stack}>
            <Label>Activity notes</Label>
            <p className={s.note}>Clear and grub the full ROW before excavation. Haul debris to approved site.</p>
            <span className={s.muted}>Sent to HeavyJob as a structured plan</span>
          </Card>
        </aside>
      </div>
    </>
  );
}
