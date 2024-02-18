import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import clsx from 'clsx';

import { Typography } from '../Typography';

import s from './Checkbox.module.scss';

interface Checkbox
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  text: string;
}

const CheckBox = ({ text, className, value, ...props }: Checkbox) => {
  return (
    <label className={clsx(s.group, className)}>
      <input type="checkbox" value={value} className={s.input} {...props} />
      <Typography className={s.label} variant="captionBold">
        {text}
      </Typography>
    </label>
  );
};

export default CheckBox;
