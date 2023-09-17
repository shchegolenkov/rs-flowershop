import React from 'react';
import TextField from '@mui/material/TextField';
import ErrorIcon from '@mui/icons-material/Error';
import EditIco from '../../../../assets/svg/edit.svg';
import EditIcoActive from '../../../../assets/svg/editActive.svg';
import EditIcoErr from '../../../../assets/svg/editErr.svg';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { CustomerData } from '../../../../types/types';

import s from '../FormFields.module.scss';

interface EmailInputProps {
  register: UseFormRegister<CustomerData>;
  errors: {
    email?: FieldError;
  };
  defaultValue?: string;
  isEditField?: boolean;
  isDisabled?: boolean;
  switchEditModeField?: () => void;
}

const EmailInput: React.FC<EmailInputProps> = ({
  register,
  errors,
  defaultValue,
  isEditField,
  isDisabled,
  switchEditModeField,
}) => {
  return (
    <div className={s.edit__field_container}>
      <div className={s.form__field_size}>
        <TextField
          disabled={isEditField ? isDisabled : false}
          defaultValue={defaultValue}
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
      {isEditField ? (
        <button type="button" onClick={!errors.email ? switchEditModeField : undefined}>
          {isDisabled ? (
            <EditIco />
          ) : !errors.email ? (
            <EditIcoActive />
          ) : (
            <div className={s.err_edit_btn}>
              <EditIcoErr />
            </div>
          )}
        </button>
      ) : null}
    </div>
  );
};

export default EmailInput;
