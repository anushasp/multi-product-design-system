import type { Meta, StoryObj } from '@storybook/react';
import { Fragment, type CSSProperties } from 'react';
import resolved from '@groundwork/tokens/resolved.json';

type Val = { ref: string | null; value: string };
const swatch = (v: string) => (/^#/.test(v) ? <i style={{ display: 'inline-block', width: 14, height: 14, borderRadius: 3, background: v, border: '1px solid var(--page-border)', verticalAlign: -2, marginRight: 6 }} /> : null);
const th: CSSProperties = { textAlign: 'left', font: '600 11px var(--type-mono)', textTransform: 'uppercase', color: 'var(--page-fg-muted)', padding: '8px 10px', borderBottom: '1px solid var(--page-border-strong)', position: 'sticky', top: 0, background: 'var(--page-bg)' };
const td: CSSProperties = { padding: '6px 10px', borderBottom: '1px solid var(--page-border)', fontSize: 13, fontFamily: 'var(--type-mono)', whiteSpace: 'nowrap' };
const cell = (v: Val) => <td style={td}>{swatch(v.value)}{v.value}<span style={{ color: 'var(--page-fg-muted)' }}> ← {v.ref}</span></td>;

const meta: Meta = { title: 'Foundations/Tokens', parameters: { layout: 'fullscreen' } };
export default meta;

export const Layers: StoryObj = { render: () => (
  <div style={{ display: 'grid', gap: 28 }}>
    <section><h2 style={{ margin: 0 }}>Four layers</h2>
      <p style={{ color: 'var(--page-fg-muted)', maxWidth: '75ch' }}>1 Primitive (raw values) → 2 Semantic base (meaning, per mode) → 3 Semantic brand (brand-owned roles, per brand × mode) → 4 Component (per-component decisions). Each layer may only reference the one below; components use only layer 4. Use the Mode and Brand toolbar to see the live values change.</p></section>
    <section><h3>4 · Component ({resolved.layers.component.length})</h3><div style={{ maxHeight: 320, overflow: 'auto' }}><table style={{ borderCollapse: 'collapse' }}><thead><tr><th style={th}>Token</th><th style={th}>References</th><th style={th}>Live value</th></tr></thead><tbody>
      {resolved.layers.component.map((c) => <tr key={c.name}><td style={td}>--{c.name.replace(/\./g, '-')}</td><td style={td}>{c.ref ?? c.value}</td><td style={td}><i style={{ display: 'inline-block', width: 40, height: 14, borderRadius: 3, background: `var(--${c.name.replace(/\./g, '-')})`, border: '1px solid var(--page-border)' }} /></td></tr>)}
    </tbody></table></div></section>
    <section><h3>3 · Semantic brand</h3>{resolved.brands.map((b) => (<div key={b}><h4>{b}</h4><table style={{ borderCollapse: 'collapse' }}><thead><tr><th style={th}>Token</th>{resolved.modes.map((m) => <th key={m} style={th}>{m}</th>)}</tr></thead><tbody>
      {(resolved.layers.semanticBrand as Record<string, { name: string; values: Record<string, Val> }[]>)[b].map((t) => <tr key={t.name}><td style={td}>--{t.name.replace(/\./g, '-')}</td>{resolved.modes.map((m) => <Fragment key={m}>{cell(t.values[m])}</Fragment>)}</tr>)}
    </tbody></table></div>))}</section>
    <section><h3>2 · Semantic base ({resolved.layers.semanticBase.length})</h3><table style={{ borderCollapse: 'collapse' }}><thead><tr><th style={th}>Token</th>{resolved.modes.map((m) => <th key={m} style={th}>{m}</th>)}</tr></thead><tbody>
      {(resolved.layers.semanticBase as { name: string; values: Record<string, Val> }[]).map((t) => <tr key={t.name}><td style={td}>--{t.name.replace(/\./g, '-')}</td>{resolved.modes.map((m) => <Fragment key={m}>{cell(t.values[m])}</Fragment>)}</tr>)}
    </tbody></table></section>
    <section><h3>1 · Primitive ({resolved.layers.primitive.length})</h3><div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {resolved.layers.primitive.map((p) => <span key={p.name} style={{ ...td, border: '1px solid var(--page-border)', borderRadius: 6 }}>{swatch(p.value)}{p.name}</span>)}</div></section>
  </div>) };
