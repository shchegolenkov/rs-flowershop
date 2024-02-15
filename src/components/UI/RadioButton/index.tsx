import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import { Typography } from '../Typography';

import s from './RadioButton.module.scss';

function RadioButton({
  name,
  disabled = false,
  className,
  value,
  onChange,
  checked,
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <label className={className}>
      <input
        type="checkbox"
        value={value}
        className={s.input}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <Typography className={s.label}>{name}</Typography>
    </label>
  );
}

export default RadioButton;
