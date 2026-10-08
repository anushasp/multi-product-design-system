import { useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, ThemeProvider, type Brand, type Mode } from '@groundwork/ui';
import { EstimatePage } from './pages/EstimatePage';
import { QuotesPage } from './pages/QuotesPage';
import { ModeBar } from './ModeBar';
import s from './App.module.css';

const DOCS_URL = import.meta.env.VITE_DOCS_URL ?? 'http://localhost:5175';
const STORYBOOK_URL = import.meta.env.VITE_STORYBOOK_URL ?? 'http://localhost:6006';

const TABS = ['Projects', 'Estimates', 'Quotes', 'Contacts'];
const ROUTES: Record<string, string> = { Estimates: '/estimate', Quotes: '/quotes' };

export function App() {
  const [mode, setMode] = useState<Mode>('office-light');
  const [brand, setBrand] = useState<Brand>('hcss');
  const nav = useNavigate();
  const { pathname } = useLocation();
  const active = pathname.startsWith('/quotes') ? 'Quotes' : 'Estimates';
  return (
    <ThemeProvider mode={mode} brand={brand} className={s.app}>
      <ModeBar mode={mode} setMode={setMode} brand={brand} setBrand={setBrand} />
      <AppBar product="HeavyBid" tabs={TABS} active={active} onTab={(t) => ROUTES[t] && nav(ROUTES[t])} searchPlaceholder={active === 'Quotes' ? 'Search quotes' : 'Search estimate'} />
      <Routes>
        <Route path="/estimate" element={<EstimatePage />} />
        <Route path="/quotes" element={<QuotesPage />} />
        <Route path="*" element={<Navigate to="/estimate" replace />} />
      </Routes>
      <footer className={s.foot}>
        <nav className={s.footlinks} aria-label="Design system">
          <span>Built with the Groundwork design system:</span>
          <a href={DOCS_URL}>Documentation</a>
          <a href={STORYBOOK_URL}>Storybook</a>
        </nav>
        <p>Concept by Anusha Saripella for interview discussion. Not affiliated with or endorsed by HCSS. Data adapted from public demo videos; some values illustrative.</p>
      </footer>
    </ThemeProvider>
  );
}
