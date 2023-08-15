import s from './FirstNameInput.module.scss';
import TextField from '@mui/material/TextField';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { CustomerData } from '../../../../types/types';

interface FirstNameInputProps {
  register: UseFormRegister<CustomerData>;
  errors: {
    firstName?: FieldError;
  };
}

const FirstNameInput: React.FC<FirstNameInputProps> = ({ register, errors }) => {
  return (
    <div className={s.form__field_size}>
      <TextField
        fullWidth
        label="First name *"
        error={!!errors.firstName}
        id="firstName-input"
        {...register('firstName')}
        helperText={
          errors.firstName ? (
            <span className={s.err__message}>
              <ErrorIcon color="error" /> {errors.firstName.message}
            </span>
          ) : (
            ''
          )
        }
      />
    </div>
  );
};

export default FirstNameInput;
