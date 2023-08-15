import s from './LastNameInput.module.scss';
import TextField from '@mui/material/TextField';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { CustomerData } from '../../../../types/types';

interface FirstNameInputProps {
  register: UseFormRegister<CustomerData>;
  errors: {
    lastName?: FieldError;
  };
}

const LastNameInput: React.FC<FirstNameInputProps> = ({ register, errors }) => {
  return (
    <div className={s.form__field_size}>
      <TextField
        fullWidth
        label="Last name *"
        error={!!errors.lastName}
        id="lastName-input"
        {...register('lastName')}
        helperText={
          errors.lastName ? (
            <span className={s.err__message}>
              <ErrorIcon color="error" /> {errors.lastName.message}
            </span>
          ) : (
            ''
          )
        }
      />
    </div>
  );
};

export default LastNameInput;
