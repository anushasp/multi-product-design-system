import { Button } from '../../components/Button/Button';
import { Label } from '../../components/Label/Label';
import { formatMoney } from '../../format';
import s from './PayItemList.module.css';
export interface PayItem { code: string; name: string; amount: number; child?: boolean; }
export interface PayItemListProps { items: PayItem[]; selected?: string; onSelect?: (code: string) => void; total: number; onAdd?: () => void; }
/** HeavyBid pay-item navigator: code, name, amount; child activities indented; selected row marked. */
export function PayItemList({ items, selected, onSelect, total, onAdd }: PayItemListProps) {
  return (
    <nav className={s.list} aria-label="Pay items">
      <div className={s.head}><Label>Pay items</Label><Button variant="tertiary" size="sm" showPlus onClick={onAdd}>Add</Button></div>
      <ul>
        {items.map((p) => (
          <li key={p.code}>
            <button type="button" className={[s.item, p.child && s.child].filter(Boolean).join(' ')} aria-current={p.code === selected ? 'true' : undefined} onClick={() => onSelect?.(p.code)}>
              <span className={s.code}>{p.code}</span><span className={s.name}>{p.name}</span><span className="gw-num">{formatMoney(p.amount)}</span>
            </button>
          </li>))}
      </ul>
      <div className={s.total}><span>Total</span><span className="gw-num">{formatMoney(total)}</span></div>
    </nav>
  );
}
