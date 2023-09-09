import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import s from './Checkbox.module.scss';
import { Typography } from '../Typography';

interface ICheckbox
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  text: string;
}

function CheckBox({ text, className, value, ...props }: ICheckbox) {
  return (
    <label className={clsx(s.group, className)}>
      <input type="checkbox" value={value} className={s.input} {...props} />
      <Typography className={s.label} variant={'captionBold'}>
        {text}
      </Typography>
    </label>
  );
}

export default CheckBox;
