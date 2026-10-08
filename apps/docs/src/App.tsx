import { Fragment, useState } from 'react';
import resolved from '@groundwork/tokens/resolved.json';
import {
  AIMarker, Button, CostCode, HoursCell, Label, ResourceChip, SegmentedControl, StatusChip, Switch, SyncChip, ThemeProvider, formatMoney, formatQty,
  type Brand, type Mode,
} from '@groundwork/ui';
import { ENTRIES } from './gallery';
import { LayerCards, PrimitivePalette, TokenResolver, TokensUsed, WhichLayer } from './foundations';
import s from './Docs.module.css';

type Val = { ref: string | null; value: string };
type Tok = { name: string; values: Record<string, Val> };
const MODES: { id: Mode; label: string }[] = [{ id: 'office-light', label: 'Office light' }, { id: 'office-dark', label: 'Office dark' }, { id: 'field', label: 'Field' }];
const BRANDS: { id: Brand; label: string }[] = [{ id: 'hcss', label: 'HCSS (concept)' }, { id: 'demo', label: 'Demo brand' }];
const cssVar = (name: string) => `var(--${name.replace(/\./g, '-')})`;
const base = resolved.layers.semanticBase as Tok[];
const brandLayer = resolved.layers.semanticBrand as Record<string, Tok[]>;
const isColor = (t: Tok) => /^#/.test(t.values['office-light'].value);
const BID_URL = import.meta.env.VITE_BID_URL ?? 'http://localhost:5173';
const JOB_URL = import.meta.env.VITE_JOB_URL ?? 'http://localhost:5174';
const SB_URL = import.meta.env.VITE_STORYBOOK_URL ?? 'http://localhost:6006';

const NAV = [['overview', 'Overview'], ['foundations', 'Foundations'], ['modes', 'Modes & brands'], ['components', 'Components'], ['patterns', 'Patterns'], ['products', 'Products'], ['contributing', 'Contributing']];

function MiniUI() {
  const [on, setOn] = useState(true);
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><Button>Send</Button><Button variant="secondary" showPlus>Add crew</Button></div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}><StatusChip status="quoted" /><ResourceChip type="equipment" /><SyncChip state="device" /></div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}><CostCode code="040-201100" /><AIMarker /></div>
      <Switch checked={on} onChange={setOn} label="Rework" />
      <table style={{ borderCollapse: 'collapse' }}><tbody><tr><HoursCell label="demo" value={5} selected /><HoursCell label="demo" value={5} /></tr></tbody></table>
    </div>
  );
}

export function App() {
  const [mode, setMode] = useState<Mode>('office-light');
  const [brand, setBrand] = useState<Brand>('hcss');
  const groups = ['Base', 'Patterns', 'Construction'] as const;
  return (
    <ThemeProvider mode={mode} brand={brand} className={s.shell}>
      <aside className={s.side}>
        <span className={s.brandmark}><i aria-hidden="true" />Groundwork</span>
        <nav className={s.nav} aria-label="Sections">{NAV.map(([id, l]) => <a key={id} href={`#${id}`}>{l}</a>)}</nav>
        <div className={s.controls}>
          <Label>Mode</Label>
          <select aria-label="Mode" value={mode} onChange={(e) => setMode(e.target.value as Mode)} style={{ font: 'inherit', padding: 6 }}>{MODES.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}</select>
          <Label>Brand</Label>
          <select aria-label="Brand" value={brand} onChange={(e) => setBrand(e.target.value as Brand)} style={{ font: 'inherit', padding: 6 }}>{BRANDS.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}</select>
        </div>
        <span className={s.muted}>Concept by Anusha Saripella. Not affiliated with or endorsed by HCSS.</span>
      </aside>

      <main className={s.main}>
        {/* OVERVIEW */}
        <section id="overview" className={s.section}>
          <Label>Design system</Label>
          <h1 className={s.h1}>Groundwork</h1>
          <p className={s.lede}>One token system and one component library for two very different products: a dense office web app for estimators (HeavyBid) and a field iPad app for foremen (HeavyJob). Use the Mode and Brand controls in the sidebar to re-skin this whole page.</p>
          <div className={s.grid2}>
            {[['One language, many contexts', 'Products share meaning (status, resource types, cost codes) and adapt presentation per environment: office or field.'],
              ['Field first', 'Gloves, sunlight, noise and no signal are design constraints: 56px targets, high contrast, offline states.'],
              ['Show the work', 'AI output is always marked, explained and reversible. A person makes the final decision.'],
              ['Design equals code', 'Figma and React share token names, component names and properties, one to one.']].map(([t, d]) => (
              <div key={t} className={s.card}><h3 className={s.h3}>{t}</h3><p className={s.p}>{d}</p></div>))}
          </div>
        </section>

        {/* FOUNDATIONS */}
        <section id="foundations" className={s.section}>
          <h2 className={s.h2}>Foundations: four token layers</h2>
          <p className={s.p}>Each layer may only reference the layer below. Every value on this page is read live from the token build, so the docs can’t drift from the code.</p>
          <LayerCards />
          <TokenResolver brand={brand} />
          <h3 className={s.h3}>Which layer should I use?</h3>
          <WhichLayer />

          <h3 className={s.h3}>2 · Semantic base colors (brand-agnostic)</h3>
          <div className={s.grid3}>
            {MODES.map((m) => (
              <ThemeProvider key={m.id} mode={m.id} brand={brand} className={s.modecol}>
                <b>{m.label}</b>
                <div className={s.swatches}>{base.filter(isColor).map((t) => <span key={t.name} className={s.sw}><i style={{ background: cssVar(t.name) }} />{t.name} <span className={s.muted}>{t.values[m.id].value}</span></span>)}</div>
              </ThemeProvider>))}
          </div>

          <h3 className={s.h3}>3 · Semantic brand ({BRANDS.find((b) => b.id === brand)?.label})</h3>
          <div className={s.grid3}>
            {MODES.map((m) => (
              <ThemeProvider key={m.id} mode={m.id} brand={brand} className={s.modecol}>
                <b>{m.label}</b>
                <div className={s.swatches}>{brandLayer[brand].map((t) => <span key={t.name} className={s.sw}><i style={{ background: cssVar(t.name) }} />{t.name} <span className={s.muted}>{t.values[m.id].value}</span></span>)}</div>
              </ThemeProvider>))}
          </div>

          <h3 className={s.h3}>Sizing, type and spacing</h3>
          <div className={s.tableWrap}><table className={s.table}>
            <thead><tr><th>Token</th>{MODES.map((m) => <th key={m.id}>{m.label}</th>)}<th>Used for</th></tr></thead>
            <tbody>
              {base.filter((t) => t.name.startsWith('size.')).map((t) => (
                <tr key={t.name}><td className={s.mono}>{t.name}</td>{MODES.map((m) => <td key={m.id} className={s.mono}>{t.values[m.id].value}</td>)}
                  <td>{({ 'size.target': 'Buttons, segments, keypad keys', 'size.target-sm': 'Small buttons', 'size.row': 'Grid rows, hours cells', 'size.text': 'Body text', 'size.text-sm': 'Secondary text, chips', 'size.label': 'Eyebrow labels', 'size.number': 'Hours, quantities' } as Record<string, string>)[t.name]}</td></tr>))}
              <tr><td className={s.mono}>space.xs → xl</td><td colSpan={3} className={s.mono}>4 · 8 · 12 · 16 · 24 px</td><td>Gaps and padding</td></tr>
              <tr><td className={s.mono}>shape.radius</td><td colSpan={3} className={s.mono}>tag 4 · control 8 · card 12 · pill 999 px</td><td>Corners</td></tr>
              <tr><td className={s.mono}>typography.family</td><td colSpan={3}>IBM Plex Sans · <span className={s.mono}>IBM Plex Mono</span> (codes, labels)</td><td>All text; tabular figures for numbers</td></tr>
            </tbody>
          </table></div>

          <PrimitivePalette />
        </section>

        {/* MODES */}
        <section id="modes" className={s.section}>
          <h2 className={s.h2}>Modes & brands</h2>
          <p className={s.p}>The same components in each mode. Nothing differs between the columns except the <code className={s.mono}>data-mode</code> attribute; switch the brand in the sidebar to change the brand layer too.</p>
          <div className={s.grid3}>
            {MODES.map((m) => <ThemeProvider key={m.id} mode={m.id} brand={brand} className={s.modecol}><b>{m.label}</b><MiniUI /></ThemeProvider>)}
          </div>
        </section>

        {/* COMPONENTS */}
        <section id="components" className={s.section}>
          <h2 className={s.h2}>Components</h2>
          <p className={s.p}>{ENTRIES.length} entries from <code className={s.mono}>@groundwork/ui</code>, all live and interactive. Each lists its matching Figma component. Full prop docs are in <a className={s.link} href={SB_URL}>Storybook</a>.</p>
          {groups.map((g) => (
            <Fragment key={g}>
              <h3 className={s.h3}>{g === 'Construction' ? 'Construction (shared domain components)' : g}</h3>
              <div className={s.grid2}>
                {ENTRIES.filter((e) => e.group === g).map((e) => (
                  <article key={e.name} className={s.card} id={`c-${e.name.replace(/\W+/g, '-').toLowerCase()}`}>
                    <div className={s.compHead}><h4 className={s.h3} style={{ margin: 0 }}>{e.name}</h4><span className={s.muted}>Figma: {e.figma}</span></div>
                    <p className={s.p} style={{ fontSize: 14 }}>{e.usage}</p>
                    <div className={s.demo}>{e.demo()}</div>
                    <TokensUsed prefixes={e.tokens} />
                  </article>))}
              </div>
            </Fragment>))}
        </section>

        {/* PATTERNS */}
        <section id="patterns" className={s.section}>
          <h2 className={s.h2}>Patterns</h2>
          <div className={s.grid2}>
            <div className={s.card}><h3 className={s.h3}>Adding things</h3>
              <div className={s.do}><span className={s.tag}>Do</span><div style={{ display: 'flex', gap: 8 }}><Button variant="secondary" showPlus>Add vendor</Button><Button variant="tertiary" showPlus>Add resource</Button></div><span className={s.muted}>“+ Add [thing]”: secondary in toolbars, tertiary inside lists.</span></div>
              <div className={s.dont}><span className={s.tag}>Don’t</span><span className={s.muted}>Mix uppercase pills, icon-only circles and green “Add Tags” buttons for the same action.</span></div>
            </div>
            <div className={s.card}><h3 className={s.h3}>AI output</h3>
              <div className={s.do}><span className={s.tag}>Do</span><span className={s.muted}>Mark every AI value with the AI marker, show the source and confidence, and let the user Accept, Edit or Revert.</span></div>
              <div className={s.dont}><span className={s.tag}>Don’t</span><span className={s.muted}>Put “AI” in button labels, invent new sparkle icons, or finalize anything without a person approving it.</span></div>
            </div>
            <div className={s.card}><h3 className={s.h3}>Status and color</h3>
              <div className={s.do}><span className={s.tag}>Do</span><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}><StatusChip status="approved" /><StatusChip status="attention" label="Needs a decision" /></div><span className={s.muted}>Always pair color with text. One status scale across products.</span></div>
              <div className={s.dont}><span className={s.tag}>Don’t</span><span className={s.muted}>Let green mean “Created” in one app and “Sent” in another.</span></div>
            </div>
            <div className={s.card}><h3 className={s.h3}>Numbers</h3>
              <div className={s.do}><span className={s.tag}>Do</span><span className={s.mono}>{formatMoney(1889.04)} · {formatQty(500, 'CY')} CY · {formatQty(1, 'AC')} AC · {formatMoney(null)}</span><span className={s.muted}>Money always 2 decimals, quantity decimals by unit, “—” for empty, right-aligned tabular figures.</span></div>
              <div className={s.dont}><span className={s.tag}>Don’t</span><span className={s.muted}>Show $0.00, 0.00 and -- for “no value” in neighbouring columns.</span></div>
            </div>
            <div className={s.card}><h3 className={s.h3}>Field use</h3>
              <div className={s.do}><span className={s.tag}>Do</span><span className={s.muted}>56px targets, about 7:1 contrast for key numbers, a visible sync state on every record, English plus the crew’s language.</span></div>
              <div className={s.dont}><span className={s.tag}>Don’t</span><span className={s.muted}>Use small text links for important actions, or white-on-white off states.</span></div>
            </div>
            <div className={s.card}><h3 className={s.h3}>Segments vs switches</h3>
              <SegmentedControl label="Example" value="a" onChange={() => {}} options={[{ value: 'a', label: 'Hours' }, { value: 'b', label: 'Crew sign-off' }]} />
              <span className={s.muted}>Segments switch between views; switches turn a single setting on or off and always show ON/OFF.</span>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section id="products" className={s.section}>
          <h2 className={s.h2}>Products using Groundwork</h2>
          <div className={s.grid2}>
            <div className={s.card}><Label>Office · web</Label><h3 className={s.h3}>HeavyBid</h3><p className={s.p}>Estimate builder and quote comparison. Default mode: Office light.</p><a className={s.link} href={BID_URL}>Open HeavyBid demo →</a></div>
            <div className={s.card}><Label>Field · iPad</Label><h3 className={s.h3}>HeavyJob</h3><p className={s.p}>Time card with bilingual crew sign-off, daily report review. Default mode: Field.</p><a className={s.link} href={JOB_URL}>Open HeavyJob demo →</a></div>
          </div>
          <div className={s.tableWrap}><table className={s.table}>
            <thead><tr><th>Component</th><th>HeavyBid</th><th>HeavyJob</th></tr></thead>
            <tbody>
              {[['Button, SegmentedControl, CostCode, ResourceChip, AIMarker, StatusChip', '✓', '✓'],
                ['AppBar, PageHeader, PayItemList, CostBreakdown, DataGrid, Stepper, AISourcePopover, AIInsight, Legend, RadioOption', '✓', '—'],
                ['IPadNavBar, SyncChip, DateStepper, TimeCardGrid, HoursCell, Keypad, SignOffQuestion, ReviewEntry, TodaysPlan', '—', '✓']].map(([c, b, j]) => <tr key={c}><td>{c}</td><td>{b}</td><td>{j}</td></tr>)}
            </tbody>
          </table></div>
        </section>

        {/* CONTRIBUTING */}
        <section id="contributing" className={s.section}>
          <h2 className={s.h2}>Contributing</h2>
          <div className={s.grid3}>
            <div className={s.card}><h3 className={s.h3}>Need a new component?</h3><ol className={s.steps}><li>Does it exist? Use it.</li><li>Can a variant extend an existing one? Extend it.</li><li>Unique to one product? Build it locally with component tokens.</li><li>Second team needs it? Promote it into Groundwork.</li></ol></div>
            <div className={s.card}><h3 className={s.h3}>Adding a brand</h3><ol className={s.steps}><li>Add the brand’s color ramp to <code className={s.mono}>primitive.json</code>.</li><li>Create <code className={s.mono}>semantic-brand.&lt;name&gt;.json</code>: 10 tokens × 3 modes.</li><li>Run <code className={s.mono}>npm run tokens</code>; the build checks the layer rules.</li><li>Check contrast, then add Figma modes.</li></ol></div>
            <div className={s.card}><h3 className={s.h3}>Retiring a component</h3><ol className={s.steps}><li>Mark it deprecated in Figma and code, with a removal date.</li><li>Lint warning points to the replacement; codemod if mechanical.</li><li>Announce in the changelog.</li><li>Remove on the date in a major version.</li></ol></div>
          </div>
          <p className={s.foot}>Groundwork is a concept by Anusha Saripella based on public demos of HCSS HeavyBid and HeavyJob. Not affiliated with or endorsed by HCSS. Source: <a className={s.link} href="https://github.com/anushasp/multi-product-design-system">github.com/anushasp/multi-product-design-system</a></p>
        </section>
      </main>
    </ThemeProvider>
  );
}
