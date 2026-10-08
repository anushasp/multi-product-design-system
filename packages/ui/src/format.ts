/** Money: always 2 decimals with $; empty -> em dash. */
export const formatMoney = (n: number | null | undefined) =>
  n == null ? '—' : n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
/** Quantities: decimals set by unit (CY/LF 2, AC 1, HR 2, EA 0). */
const UNIT_DECIMALS: Record<string, number> = { CY: 2, LF: 2, SY: 2, HR: 2, AC: 1, EA: 0, TON: 2 };
export const formatQty = (n: number | null | undefined, unit?: string) =>
  n == null ? '—' : n.toLocaleString('en-US', { minimumFractionDigits: UNIT_DECIMALS[unit ?? ''] ?? 2, maximumFractionDigits: UNIT_DECIMALS[unit ?? ''] ?? 2 });
