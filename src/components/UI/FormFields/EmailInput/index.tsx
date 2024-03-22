import ErrorIcon from '@mui/icons-material/Error';
import TextField from '@mui/material/TextField';
import { FieldError, UseFormRegister } from 'react-hook-form';

import { CustomerData } from '@/types/types';

import EditIcon from '@/assets/svg/edit.svg';
import EditIconActive from '@/assets/svg/editActive.svg';
import EditIconErr from '@/assets/svg/editErr.svg';

import s from '../FormFields.module.scss';

interface EmailInput {
  register: UseFormRegister<CustomerData>;
  errors: {
    email?: FieldError;
  };
  defaultValue?: string;
  isEditField?: boolean;
  isDisabled?: boolean;
  switchEditModeField?: () => void;
}

const EmailInput = ({
  register,
  errors,
  defaultValue,
  isEditField,
  isDisabled,
  switchEditModeField,
}: EmailInput) => {
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
            <EditIcon />
          ) : !errors.email ? (
            <EditIconActive />
          ) : (
            <div className={s.err_edit_btn}>
              <EditIconErr />
            </div>
          )}
        </button>
      ) : null}
    </div>
  );
};

export default EmailInput;
