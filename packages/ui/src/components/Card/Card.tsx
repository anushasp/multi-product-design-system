import type { HTMLAttributes } from 'react';
import s from './Card.module.css';
/** Raised container used by both products. */
export function Card({ className, padded = true, ...rest }: HTMLAttributes<HTMLDivElement> & { padded?: boolean }) {
  return <div className={[s.card, padded && s.padded, className].filter(Boolean).join(' ')} {...rest} />;
}
