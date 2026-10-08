import s from './AppBar.module.css';
export interface AppBarProps { product: string; tabs: string[]; active: string; onTab?: (t: string) => void; searchPlaceholder?: string; initials?: string; }
/** Figma: App bar. Header for every HCSS web product; Active sets the brand indicator. */
export function AppBar({ product, tabs, active, onTab, searchPlaceholder = 'Search', initials = 'AS' }: AppBarProps) {
  return (
    <header className={s.bar}>
      <span className={s.mark}><i aria-hidden="true" />{product}</span>
      <nav className={s.tabs} aria-label={product}>
        {tabs.map((t) => (
          <button key={t} type="button" className={s.tab} aria-current={t === active ? 'page' : undefined} onClick={() => onTab?.(t)}>{t}</button>
        ))}
      </nav>
      <span className={s.spacer} />
      <label className={s.search}><span className={s.vh}>Search</span><input placeholder={searchPlaceholder} /><kbd>Ctrl K</kbd></label>
      <span className={s.avatar} aria-label="Account">{initials}</span>
    </header>
  );
}
