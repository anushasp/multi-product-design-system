import { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ThemeProvider, type Brand, type Mode } from '@groundwork/ui';
import { TimeCardPage } from './pages/TimeCardPage';
import { ReportPage } from './pages/ReportPage';
import { ModeBar } from './ModeBar';
import s from './App.module.css';

export function App() {
  const [mode, setMode] = useState<Mode>('field');
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
      <p className={s.foot}>Concept by Anusha Saripella for interview discussion. Not affiliated with or endorsed by HCSS. Crew names are fictional; some values illustrative.</p>
    </ThemeProvider>
  );
}
