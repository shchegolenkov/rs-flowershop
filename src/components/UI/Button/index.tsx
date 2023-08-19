import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import clsx from 'clsx';
import s from './Button.module.scss';

interface IButton
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  full?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}

function Button({
  children,
  className,
  variant = 'primary',
  full = false,
  type = 'button',
  disabled = false,
  ...props
}: IButton) {
  return (
    <button
      className={clsx(s.button, s[variant], { [s.full]: full }, className)}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
