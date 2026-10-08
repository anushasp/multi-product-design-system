import type { ReactNode, CSSProperties } from 'react';
import './styles.css';

export type Mode = 'office-light' | 'office-dark' | 'field';
export type Brand = 'hcss' | 'demo';

export interface ThemeProviderProps { mode?: Mode; brand?: Brand; children: ReactNode; className?: string; style?: CSSProperties; }

/** Sets data-mode + data-brand on one wrapper. Every token layer resolves from here, so nesting a provider re-themes a subtree. */
export function ThemeProvider({ mode = 'office-light', brand = 'hcss', children, className, style }: ThemeProviderProps) {
  return <div data-mode={mode} data-brand={brand} className={['gw-theme', className].filter(Boolean).join(' ')} style={style}>{children}</div>;
}
