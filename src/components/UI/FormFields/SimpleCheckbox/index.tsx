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
  isChecked: boolean;
  setChecked: (value: boolean) => void;
}

const SimpleCheckbox: React.FC<SimpleCheckboxProps> = ({
  register,
  name,
  label,
  id,
  isChecked,
  setChecked,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox checked={isChecked} {...register(name)} onChange={handleChange} color="default" />
      }
      label={label}
      id={id}
    />
  );
};

export default SimpleCheckbox;
