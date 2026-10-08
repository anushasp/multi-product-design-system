import { useState } from 'react';
import resolved from '@groundwork/tokens/resolved.json';
import { Label, type Brand, type Mode } from '@groundwork/ui';
import s from './Docs.module.css';

type Val = { ref: string | null; value: string };
type Tok = { name: string; values: Record<string, Val> };
type Comp = { name: string; ref: string | null; value: string | null };

const MODES: { id: Mode; label: string }[] = [{ id: 'office-light', label: 'Office light' }, { id: 'office-dark', label: 'Office dark' }, { id: 'field', label: 'Field' }];
const base = resolved.layers.semanticBase as Tok[];
const brandLayer = resolved.layers.semanticBrand as Record<string, Tok[]>;
const component = resolved.layers.component as Comp[];
const primitive = resolved.layers.primitive as { name: string; value: string }[];
const cssName = (n: string) => `--${n.replace(/\./g, '-')}`;
const isHex = (v: string) => /^#/.test(v);

/** 1 · The four layer cards, each with "who uses it" guidance. */
export function LayerCards() {
  const layers = [
    ['1 · Primitive', `${primitive.length} raw values`, 'color.green.600 = #008933', 'Never use directly. Reference only.'],
    ['2 · Semantic base', `${base.length} meanings, per mode`, 'surface.page → color.neutral.25', 'Use in product layouts: surfaces, text, borders, spacing.'],
    ['3 · Semantic brand', `${brandLayer.hcss.length} roles, per brand × mode`, 'action.primary → color.blue.600', 'Owned by brand teams. A new brand is one file.'],
    ['4 · Component', `${component.length} component decisions`, 'button.primary-bg → action.primary', 'Used inside components only.'],
  ];
  return (
    <div className={s.layers}>
      {layers.map(([t, c, e, g]) => (
        <div key={t} className={s.card}>
          <h3 className={s.h3}>{t}</h3><span className={s.muted}>{c}</span><code className={s.mono}>{e}</code>
          <span className={s.guide}>{g}</span>
        </div>))}
    </div>
  );
}

/** 2 · How a token resolves: component → semantic → primitive → value, per mode, for the current brand. */
const EXAMPLES = ['button.primary-bg', 'button.height-md', 'cost-code.fg', 'status-chip.quoted', 'grid.selected-bg', 'hours-cell.font-size', 'card.bg'];
export function TokenResolver({ brand }: { brand: Brand }) {
  const [name, setName] = useState('button.primary-bg');
  const comp = component.find((c) => c.name === name)!;
  const semName = comp.ref!;
  const inBrand = brandLayer[brand].find((t) => t.name === semName);
  const sem = inBrand ?? base.find((t) => t.name === semName)!;
  return (
    <div className={s.card}>
      <div className={s.compHead}><h3 className={s.h3}>How a token resolves</h3><span className={s.muted}>brand: {brand}</span></div>
      <p className={s.p} style={{ fontSize: 14 }}>Components only name the decision. The mode and brand on the wrapper decide the final value.</p>
      <div className={s.chips}>{EXAMPLES.map((e) => (
        <button key={e} type="button" className={s.chipBtn} aria-pressed={e === name} onClick={() => setName(e)}>{e}</button>))}</div>
      <div className={s.tableWrap}><table className={s.table}>
        <thead><tr><th>Mode</th><th>4 · Component</th><th>{inBrand ? '3 · Semantic brand' : '2 · Semantic base'}</th><th>1 · Primitive</th><th>Value</th></tr></thead>
        <tbody>{MODES.map((m) => { const v = sem.values[m.id]; return (
          <tr key={m.id}>
            <td><b>{m.label}</b></td>
            <td className={s.mono}>{cssName(name)}</td>
            <td className={s.mono}>→ {cssName(semName)}</td>
            <td className={s.mono}>→ {v.ref}</td>
            <td className={s.mono}>{isHex(v.value) && <i className={s.dot} style={{ background: v.value }} />}{v.value}</td>
          </tr>); })}</tbody>
      </table></div>
    </div>
  );
}

/** 3 · Which layer should I use? */
export function WhichLayer() {
  const rows = [
    ['Building or changing a component', '4 · Component', '--button-primary-bg', 'Keeps every use of the component consistent.'],
    ['Laying out a page or screen', '2 · Semantic base', '--surface-page, --space-lg, --border-default', 'Meaning stays right in every mode.'],
    ['Defining or updating a brand', '3 · Semantic brand', '--action-primary, --brand-accent', 'Brand change can’t break status or field sizing.'],
    ['Anything else', 'Never 1 · Primitive', '--color-blue-600', 'Raw values bypass modes and brands.'],
  ];
  return (
    <div className={s.tableWrap}><table className={s.table}>
      <thead><tr><th>I’m…</th><th>Use</th><th>Example</th><th>Why</th></tr></thead>
      <tbody>{rows.map(([a, b, c, d]) => <tr key={a}><td>{a}</td><td><b>{b}</b></td><td className={s.mono}>{c}</td><td>{d}</td></tr>)}</tbody>
    </table></div>
  );
}

/** 5 · Primitive palette, reference only. */
export function PrimitivePalette() {
  const colors = primitive.filter((p) => isHex(p.value));
  const families = [...new Set(colors.map((c) => c.name.split('.')[1]))];
  const dims = primitive.filter((p) => !isHex(p.value) && !p.name.startsWith('font.'));
  return (
    <details className={s.card}>
      <summary className={s.summary}><b>1 · Primitive palette</b> <span className={s.muted}>reference only · {primitive.length} values</span></summary>
      <div className={s.palette}>
        {families.map((f) => (
          <div key={f} className={s.ramp}><Label>{f}</Label>
            <div className={s.rampRow}>{colors.filter((c) => c.name.split('.')[1] === f).map((c) => (
              <span key={c.name} className={s.rampSw} title={`${c.name} ${c.value}`}><i style={{ background: c.value }} /><small className={s.mono}>{c.name.split('.')[2]}</small></span>))}</div>
          </div>))}
      </div>
      <p className={s.mono} style={{ margin: 0 }}>{dims.map((d) => `${d.name} ${d.value}`).join(' · ')}</p>
    </details>
  );
}

/** 4 · Tokens used by a component (collapsible, on each component card). */
export function TokensUsed({ prefixes }: { prefixes: string[] }) {
  const list = component.filter((c) => prefixes.some((p) => (p.endsWith('.') ? c.name.startsWith(p) : c.name === p)));
  if (!list.length) return null;
  return (
    <details className={s.tokens}>
      <summary className={s.summary}>Tokens used ({list.length})</summary>
      <ul>{list.map((c) => <li key={c.name} className={s.mono}>{cssName(c.name)} <span className={s.muted}>→ {c.ref ?? c.value}</span></li>)}</ul>
    </details>
  );
}

