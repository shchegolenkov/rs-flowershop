import React from 'react';
import { UseFormRegister, FieldErrors, FieldError, FieldValues, Path } from 'react-hook-form'; // Import FieldValues
import TextField from '@mui/material/TextField';
import ErrorIcon from '@mui/icons-material/Error';

import s from '../FormFields.module.scss';

interface SelectInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  err: FieldError | undefined;
  errMessage: string | undefined;
  errors: FieldErrors<T>;
  label: string;
  id: string;
  defaultValue?: string;
  selectData: SelectData[];
  isEditField?: boolean;
  isDisabled?: boolean;
}

interface SelectData {
  value: string;
  label: string;
}

const SimpleSelect = <T extends FieldValues>({
  register,
  err,
  errMessage,
  name,
  label,
  id,
  selectData,
  defaultValue,
  isEditField,
  isDisabled,
}: SelectInputProps<T>) => {
  return (
    <div className={s.form__field_size_select}>
      <TextField
        disabled={isEditField && isDisabled !== undefined ? isDisabled : false}
        fullWidth
        id={id}
        select
        defaultValue={defaultValue}
        error={!!err}
        label={label}
        {...register(name)}
        SelectProps={{
          native: true,
        }}
        helperText={
          err ? (
            <span className={s.err__message}>
              <ErrorIcon color="error" /> {errMessage}
            </span>
          ) : (
            ''
          )
        }
      >
        {selectData.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
    </div>
  );
};

export default SimpleSelect;
