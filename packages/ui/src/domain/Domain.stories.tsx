import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PayItemList } from './PayItemList/PayItemList';
import { CostBreakdown } from './CostBreakdown/CostBreakdown';
import { AIInsight } from './AIInsight/AIInsight';
import { DateStepper } from './DateStepper/DateStepper';
import { TimeCardGrid } from './TimeCardGrid/TimeCardGrid';
import { TodaysPlan } from './TodaysPlan/TodaysPlan';
import { Button } from '../components/Button/Button';

const meta: Meta = { title: 'Domain/Construction' };
export default meta;
type S = StoryObj;

export const PayItems: S = { render: function R() { const [sel, setSel] = useState('100001');
  return <div style={{ width: 280 }}><PayItemList selected={sel} onSelect={setSel} total={173762.5} items={[{ code: '100', name: 'Clear Debris', amount: 16611.99 }, { code: '100001', name: 'Clear & Grub - Heavy', amount: 15429.03, child: true }, { code: '200', name: 'Excavation & Removal', amount: 26633.91 }]} /></div>; } };
export const Costs: S = { render: () => <div style={{ maxWidth: 720 }}><CostBreakdown costs={{ labor: 5610.87, equipment: 9818.16 }} /></div> };
export const Insight: S = { render: () => <div style={{ width: 300 }}><AIInsight title="Changes since yesterday" source="estimate audit log, 2 entries" items={['Pay item 300 unit price set to $115.00 (suggested $109.16).', 'Pay item 100 unit price set to $6.00 (suggested $5.94).']} actions={<Button size="sm" variant="secondary">Open audit log</Button>} /></div> };
export const DateControl: S = { render: () => <DateStepper relative="Yesterday" date="Thu, Aug 2" /> };
export const TimeCard: S = { render: function R() { const [col, setCol] = useState(0);
  return <TimeCardGrid selectedColumn={col} onSelectColumn={setCol} summary="Crew · 2 people, 1 machine"
    crew={[{ id: 'a', name: 'Ray Ortega', role: 'Foreman' }, { id: 'b', name: 'Marisol Vega', role: 'Operator' }, { id: 'c', name: 'Cat D-3 Dozer', role: 'Linked to Marisol Vega', equipment: '02-001' }]}
    costCodes={[{ code: '040-201100', description: 'Excavation, Scraper', quantity: '500.0 CY' }, { code: '010-100001', description: 'Clear & Grub - Heavy', quantity: '1.0 AC' }]}
    hours={[[5, 5], [5, 5], [5, 5]]} />; } };
export const Plan: S = { render: () => <div style={{ width: 380 }}><TodaysPlan code="040-201100" activity="Excavation, Scraper" stats={[{ label: 'Planned', value: '3,200 CY / shift' }, { label: 'Reported today', value: '500 CY' }]}
  installed={{ done: 29382, total: 738897, unit: 'CY' }} crew={[{ type: 'equipment', label: 'Cat D6 Dozer' }, { type: 'labor', label: '5 × Operator' }]} /></div> };
