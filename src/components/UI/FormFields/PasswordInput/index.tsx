import React, { MouseEvent, useState } from 'react';
import { FieldError, UseFormRegister, FieldValues, Path } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import s from '../FormFields.module.scss';

interface PasswordInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  err: FieldError | undefined;
  errMessage: string | undefined;
  label: string;
  id: string;
}

const PasswordInput = <T extends FieldValues>({
  register,
  name,
  err,
  errMessage,
  label,
  id,
}: PasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className={s.form__field_size}>
      <FormControl error={!!err} fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
        <OutlinedInput
          label={label}
          error={!!err}
          id={id}
          {...register(name)}
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText id="component-error-text">
          {err ? (
            <span className={s.err__message}>
              <ErrorIcon color="error" /> {errMessage}
            </span>
          ) : (
            ''
          )}
        </FormHelperText>
      </FormControl>
    </div>
  );
};

export default PasswordInput;
