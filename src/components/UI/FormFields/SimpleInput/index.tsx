import s from '../FormFields.module.scss';
import TextField from '@mui/material/TextField';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import { FieldError, FieldErrors, UseFormRegister } from 'react-hook-form';
import { CustomerData, ProfileForm } from '../../../../types/types';
import EditIco from '../../../../assets/svg/edit.svg';
import EditIcoActive from '../../../../assets/svg/editActive.svg';
import EditIcoErr from '../../../../assets/svg/editErr.svg';

interface SimpleInputProps {
  register: UseFormRegister<CustomerData> | UseFormRegister<ProfileForm>;
  name: keyof CustomerData | keyof ProfileForm;
  err: FieldError | undefined;
  errMessage: string | undefined;
  errors: FieldErrors<CustomerData>;
  label: string;
  id: string;
  defaultValue?: string;
  isEditField?: boolean;
  isDisabled?: boolean;
  switchEditModeField?: () => void;
  isAddressField?: boolean;
}

const SimpleInput: React.FC<SimpleInputProps> = ({
  register,
  err,
  errMessage,
  name,
  label,
  id,
  defaultValue,
  isEditField,
  isDisabled,
  switchEditModeField,
  isAddressField,
}) => {
  return (
    <div className={s.edit__field_container}>
      <div className={s.form__field_size}>
        <TextField
          disabled={isEditField && isDisabled !== undefined ? isDisabled : false}
          defaultValue={defaultValue}
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
      {isEditField && isAddressField === undefined ? (
        <button type="button" onClick={!errMessage ? switchEditModeField : undefined}>
          {isDisabled ? (
            <EditIco />
          ) : !errMessage ? (
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

export default SimpleInput;
