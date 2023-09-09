import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { CustomerData, ProfileForm } from '../../../../types/types';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface SimpleCheckboxProps {
  register: UseFormRegister<CustomerData> | UseFormRegister<ProfileForm>;
  name: keyof CustomerData | keyof ProfileForm;
  label: string;
  id: string;
  isChecked: boolean;
  setChecked: (value: boolean) => void;
  isEditField?: boolean;
  isDisabled?: boolean;
}

const SimpleCheckbox: React.FC<SimpleCheckboxProps> = ({
  register,
  name,
  label,
  id,
  isChecked,
  setChecked,
  isEditField,
  isDisabled,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          disabled={isEditField && isDisabled !== undefined ? isDisabled : false}
          checked={isChecked}
          {...register(name)}
          onChange={handleChange}
          color="default"
        />
      }
      label={label}
      id={id}
    />
  );
};

export default SimpleCheckbox;
