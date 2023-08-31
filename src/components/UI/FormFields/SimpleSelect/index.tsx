import s from '../FormFields.module.scss';
import TextField from '@mui/material/TextField';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import { FieldError, FieldErrors, UseFormRegister } from 'react-hook-form';
import { CustomerData, ProfileForm } from '../../../../types/types';

interface SelectInputProps {
  register: UseFormRegister<CustomerData> | UseFormRegister<ProfileForm>;
  name: keyof CustomerData | keyof ProfileForm;
  err: FieldError | undefined;
  errMessage: string | undefined;
  errors: FieldErrors<CustomerData> | FieldErrors<ProfileForm>;
  label: string;
  id: string;
  defaultValue: string;
  selectData: SelectData[];
  isEditField?: boolean;
  isDisabled?: boolean;
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
  defaultValue,
  isEditField,
  isDisabled,
}) => {
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
