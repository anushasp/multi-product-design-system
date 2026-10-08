import { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ThemeProvider, type Brand, type Mode } from '@groundwork/ui';
import { TimeCardPage } from './pages/TimeCardPage';
import { ReportPage } from './pages/ReportPage';
import { ModeBar } from './ModeBar';
import { DOCS_URL, STORYBOOK_URL } from './links';
import s from './App.module.css';


export function App() {
  const [mode, setMode] = useState<Mode>('office-light');
  const [brand, setBrand] = useState<Brand>('hcss');
  const nav = useNavigate();
  return (
    <ThemeProvider mode={mode} brand={brand} className={s.app}>
      <ModeBar mode={mode} setMode={setMode} brand={brand} setBrand={setBrand} />
      <div className={s.stage}>
        <div className={s.ipad} aria-label="iPad, landscape">
          <Routes>
            <Route path="/timecard" element={<TimeCardPage onReport={() => nav('/report')} />} />
            <Route path="/report" element={<ReportPage onBack={() => nav('/timecard')} />} />
            <Route path="*" element={<Navigate to="/timecard" replace />} />
          </Routes>
        </div>
      </div>
      <footer className={s.foot}>
        <nav className={s.footlinks} aria-label="Design system (footer)">
          <span>Built with the Groundwork design system:</span>
          <a href={DOCS_URL}>Documentation</a>
          <a href={STORYBOOK_URL}>Storybook</a>
        </nav>
        <p>Concept by Anusha Saripella for interview discussion. Not affiliated with or endorsed by HCSS. Crew names are fictional; some values illustrative.</p>
      </footer>
    </ThemeProvider>
  );
}
