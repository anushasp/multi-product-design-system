import s from './CostCode.module.css';
/** Figma: Cost code tag. One format across products, e.g. 040-201100. */
export function CostCode({ code }: { code: string }) { return <span className={s.code}>{code}</span>; }
