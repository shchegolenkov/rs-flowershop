import React from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface SimpleCheckboxProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  label: string;
  id: string;
  isChecked: boolean;
  setChecked: (value: boolean) => void;
  isEditField?: boolean;
  isDisabled?: boolean;
}

const SimpleCheckbox = <T extends FieldValues>({
  register,
  name,
  label,
  id,
  isChecked,
  setChecked,
  isEditField,
  isDisabled,
}: SimpleCheckboxProps<T>) => {
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
