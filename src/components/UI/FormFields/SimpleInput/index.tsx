import React from 'react';

import ErrorIcon from '@mui/icons-material/Error';
import TextField from '@mui/material/TextField';
import { FieldError, FieldErrors, UseFormRegister, FieldValues, Path } from 'react-hook-form';

import EditIco from '@/assets/svg/edit.svg';
import EditIcoActive from '@/assets/svg/editActive.svg';
import EditIcoErr from '@/assets/svg/editErr.svg';

import s from '../FormFields.module.scss';

interface SimpleInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  err: FieldError | undefined;
  errMessage: string | undefined;
  errors: FieldErrors<T>;
  label: string;
  id: string;
  defaultValue?: string;
  isEditField?: boolean;
  isDisabled?: boolean;
  switchEditModeField?: () => void;
  isAddressField?: boolean;
}

const SimpleInput = <T extends FieldValues>({
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
}: SimpleInputProps<T>) => {
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
