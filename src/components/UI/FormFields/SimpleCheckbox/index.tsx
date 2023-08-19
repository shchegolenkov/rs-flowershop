/*import s from './SimpleSelect.module.scss';*/
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { CustomerData } from '../../../../types/types';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface SimpleCheckboxProps {
  register: UseFormRegister<CustomerData>;
  name: keyof CustomerData;
  label: string;
  id: string;
}

const SimpleCheckbox: React.FC<SimpleCheckboxProps> = ({ register, name, label, id }) => {
  return (
    <FormControlLabel
      control={<Checkbox {...register(name)} color="default" />}
      label={label}
      id={id}
    />
  );
};

export default SimpleCheckbox;
