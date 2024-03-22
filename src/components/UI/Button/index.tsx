import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import clsx from 'clsx';

import s from './Button.module.scss';

interface Button
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'underlined' | 'icon';
  full?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}

const Button = ({
  children,
  className = '',
  variant = 'primary',
  full = false,
  type = 'button',
  disabled = false,
  ...props
}: Button) => {
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
};

export default Button;
