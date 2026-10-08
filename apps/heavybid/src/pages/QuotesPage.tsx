import { useState } from 'react';
import { AIMarker, AISourcePopover, Button, Card, DataGrid, Legend, PageHeader, Popover, RadioOption, ResourceChip, SegmentedControl, Stepper, Switch, Toolbar, formatMoney, formatQty, type Column } from '@groundwork/ui';
import { quoteRows, vendors, type QuoteRow } from '../data/quotes';
import s from './Quotes.module.css';

const PLUG: Record<string, number | null> = { DR10040: null, RCP12: 35, DR10090: null };
/** Lowest non-empty price wins; on a tie the later vendor (Adam's) stays selected, as in the demo. */
function selectedIndex(r: QuoteRow) {
  let best = -1;
  r.prices.forEach((p, i) => { if (p != null && (best < 0 || p <= (r.prices[best] as number))) best = i; });
  return best;
}
const minPrice = (r: QuoteRow) => Math.min(...r.prices.filter((p): p is number => p != null));

export function QuotesPage() {
  const [view, setView] = useState<'unit' | 'extended'>('unit');
  const [showPlug, setShowPlug] = useState(false);
  const [openPop, setOpenPop] = useState<string | null>('DR10040');
  const [accepted, setAccepted] = useState<Record<string, boolean>>({});
  const value = (r: QuoteRow, p: number | null) => (p == null ? null : view === 'unit' ? p : p * r.qty);
  const total = quoteRows.reduce((a, r) => a + (r.prices[selectedIndex(r)] as number) * r.qty, 0);

  const vendorCell = (r: QuoteRow, i: number) => {
    const text = formatMoney(value(r, r.prices[i]));
    if (!r.ai[i] || accepted[r.code]) return text;
    const open = openPop === r.code;
    return (
      <Popover open={open} onClose={() => setOpenPop(null)}
        anchor={<><AIMarker onClick={() => setOpenPop(open ? null : r.code)} expanded={open} />{text}</>}>
        <AISourcePopover title="Read from vendor quote" source={r.source ?? ''} confidence="High" level={0.92} editLabel="Edit price" viewLabel="Open quote"
          onAccept={() => { setAccepted((a) => ({ ...a, [r.code]: true })); setOpenPop(null); }} />
      </Popover>
    );
  };

  const columns: Column<QuoteRow>[] = [
    { key: 'res', header: 'Resource', render: (r) => <ResourceChip type="material" label={r.code} mono /> },
    { key: 'desc', header: 'Description', render: (r) => r.description },
    { key: 'qty', header: 'Est. qty', align: 'right', render: (r) => formatQty(r.qty, r.unit) },
    { key: 'unit', header: 'Unit', render: (r) => r.unit },
    ...(showPlug ? [{ key: 'plug', header: 'Plug price', align: 'right' as const, render: (r: QuoteRow) => formatMoney(value(r, PLUG[r.code])) }] : []),
    ...vendors.map((v, i): Column<QuoteRow> => ({
      key: `v${i}`, header: v, align: 'right', render: (r) => vendorCell(r, i),
      cell: (r) => {
        const isMin = r.prices[i] != null && r.prices[i] === minPrice(r);
        const tie = isMin && r.prices.filter((p) => p === minPrice(r)).length > 1;
        return { highlight: isMin ? 'best' : 'none', tag: isMin ? (tie ? 'Tie' : 'Lowest') : undefined };
      },
    })),
    { key: 'sel', header: 'Selected vendor', render: (r) => <RadioOption label={vendors[selectedIndex(r)]} /> },
    { key: 'ext', header: 'Extended', align: 'right', render: (r) => formatMoney((r.prices[selectedIndex(r)] as number) * r.qty) },
  ];

  return (
    <>
      <PageHeader breadcrumb="Quote folders / STB001 Downtown Eastside Drainage" title="RCP pipe" status="quoted"
        secondaryAction={<Button variant="secondary" showPlus>Add vendor</Button>} primaryAction={<Button>Apply to estimate</Button>} />
      <div className={s.wrap}>
        <Stepper label="Quote folder progress" steps={[{ label: 'Created', state: 'done' }, { label: 'In progress', state: 'done' }, { label: 'Quoted', state: 'current' }, { label: 'Selected', state: 'upcoming' }, { label: 'Done', state: 'upcoming' }]} />
        <Toolbar label="Quote view" end={<Legend items={[{ mark: 'ai', label: 'Read from vendor quote' }, { mark: 'best', label: 'Lowest price' }, { mark: 'empty', label: 'No bid' }]} />}>
          <SegmentedControl label="Show prices as" value={view} onChange={setView} options={[{ value: 'unit', label: 'Unit price' }, { value: 'extended', label: 'Extended' }]} />
          <Switch checked={showPlug} onChange={setShowPlug} label="Show plug prices" />
        </Toolbar>
        <Card padded={false} className={s.card}>
          <DataGrid<QuoteRow> caption="Vendor quote comparison" rows={quoteRows} rowKey={(r) => r.code} columns={columns}
            footer={<div className={s.foot}><span>Selected total</span><span className="gw-num">{formatMoney(total)}</span></div>} />
        </Card>
        <p className={s.note}>Click an AI marker to see where a price came from. Accepting it removes the marker.</p>
      </div>
    </>
  );
}
