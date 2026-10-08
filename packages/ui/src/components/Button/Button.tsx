import type { ButtonHTMLAttributes } from 'react';
import s from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma: Style */ variant?: 'primary' | 'secondary' | 'tertiary';
  /** Figma: Size */ size?: 'md' | 'sm';
  /** Figma: Show plus. Use for every add action: "+ Add [thing]". */ showPlus?: boolean;
  fullWidth?: boolean;
}

export function Button({ variant = 'primary', size = 'md', showPlus, fullWidth, className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={[s.btn, s[variant], s[size], fullWidth && s.full, className].filter(Boolean).join(' ')} {...rest}>
      {showPlus && <span aria-hidden="true" className={s.plus}>+</span>}
      {children}
    </button>
  );
}
