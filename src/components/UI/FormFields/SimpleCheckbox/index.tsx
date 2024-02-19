import { ChangeEvent } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

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
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
