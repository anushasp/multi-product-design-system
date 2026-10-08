import { SegmentedControl, type Mode, type Brand } from '@groundwork/ui';
import s from './App.module.css';
/** Demo-only switcher, outside the product UI. Shows the token layers re-skinning the app. */
export function ModeBar({ mode, setMode, brand, setBrand }: { mode: Mode; setMode: (m: Mode) => void; brand: Brand; setBrand: (b: Brand) => void }) {
  return (
    <div className={s.modebar}>
      <span className={s.modelabel}>Concept demo</span>
      <SegmentedControl label="Mode" value={mode} onChange={setMode} options={[{ value: 'office-light', label: 'Office light' }, { value: 'office-dark', label: 'Office dark' }, { value: 'field', label: 'Field' }]} />
      <SegmentedControl label="Brand" value={brand} onChange={setBrand} options={[{ value: 'hcss', label: 'HCSS' }, { value: 'demo', label: 'Demo brand' }]} />
    </div>
  );
}
