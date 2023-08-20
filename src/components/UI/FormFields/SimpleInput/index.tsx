import s from '../FormFields.module.scss';
import TextField from '@mui/material/TextField';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import { FieldError, FieldErrors, UseFormRegister } from 'react-hook-form';
import { CustomerData } from '../../../../types/types';

interface StreetInputProps {
  register: UseFormRegister<CustomerData>;
  name: keyof CustomerData;
  err: FieldError | undefined;
  errMessage: string | undefined;
  errors: FieldErrors<CustomerData>;
  label: string;
  id: string;
}

const SimpleInput: React.FC<StreetInputProps> = ({
  register,
  err,
  errMessage,
  name,
  label,
  id,
}) => {
  return (
    <div className={s.form__field_size}>
      <TextField
        fullWidth
        label={label}
        error={!!err}
        id={id}
        {...register(name)}
        helperText={
          err ? (
            <span className={s.err__message}>
              <ErrorIcon color="error" /> {errMessage}
            </span>
          ) : (
            ''
          )
        }
      />
    </div>
  );
};

export default SimpleInput;
