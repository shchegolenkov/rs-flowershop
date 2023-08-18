import s from './SimpleSelect.module.scss';
import TextField from '@mui/material/TextField';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import { FieldError, FieldErrors, UseFormRegister } from 'react-hook-form';
import { CustomerData } from '../../../../types/types';

interface SelectInputProps {
  register: UseFormRegister<CustomerData>;
  name: keyof CustomerData;
  err: FieldError | undefined;
  errMessage: string | undefined;
  errors: FieldErrors<CustomerData>;
  label: string;
  id: string;
  defaultValue: string;
  selectData: SelectData[];
}

interface SelectData {
  value: string;
  label: string;
}

const SimpleSelect: React.FC<SelectInputProps> = ({
  register,
  err,
  errMessage,
  name,
  label,
  id,
  selectData,
}) => {
  return (
    <div className={s.form__field_size}>
      <TextField
        fullWidth
        id={id}
        select
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
