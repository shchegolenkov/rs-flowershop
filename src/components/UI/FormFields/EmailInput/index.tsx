import s from './EmailInput.module.scss';
import TextField from '@mui/material/TextField';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { CustomerData } from '../../../../types/types';

interface EmailInputProps {
  register: UseFormRegister<CustomerData>;
  errors: {
    email?: FieldError;
  };
}

const EmailInput: React.FC<EmailInputProps> = ({ register, errors }) => {
  return (
    <div className={s.form__field_size}>
      <TextField
        fullWidth
        label="Email *"
        error={!!errors.email}
        id="email-input"
        {...register('email')}
        helperText={
          errors.email ? (
            <span className={s.err__message}>
              <ErrorIcon color="error" /> {errors.email.message}
            </span>
          ) : (
            ''
          )
        }
      />
    </div>
  );
};

export default EmailInput;
