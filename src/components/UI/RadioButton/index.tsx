import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import s from './RadioButton.module.scss';
import { Typography } from '../Typography';

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
