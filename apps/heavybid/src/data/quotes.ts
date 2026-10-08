export const vendors = ['ACE Contractors', 'Adam’s Pipe Supply', 'Dave’s Pipe Constr.'] as const;
export interface QuoteRow { code: string; description: string; qty: number; unit: string; prices: (number | null)[]; ai: boolean[]; source?: string; }
// Prices for 21" and 12" and the 36" $80.00 come from the public demo; the rest are illustrative.
export const quoteRows: QuoteRow[] = [
  { code: 'DR10040', description: '21" RCP', qty: 352, unit: 'LF', prices: [145, 120, null], ai: [false, true, false], source: 'Adam’s Pipe Supply, quote PDF page 2, line 4: “21 in RCP Class III … $120.00/LF”' },
  { code: 'RCP12', description: '12" RCP', qty: 11128, unit: 'LF', prices: [75, 75, null], ai: [false, true, false], source: 'Adam’s Pipe Supply, quote PDF page 2, line 7: “12 in RCP Class III … $75.00/LF”' },
  { code: 'DR10090', description: '36" RCP', qty: 800, unit: 'LF', prices: [86.5, 82, 80], ai: [false, true, false], source: 'Adam’s Pipe Supply, quote PDF page 3, line 1: “36 in RCP Class III … $82.00/LF”' },
];
