import s from './PasswordInput.module.scss';
import React, { MouseEvent } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemIcon,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DeepMap, FieldError, FieldValues, UseFormRegister } from 'react-hook-form';

interface PasswordInputProps {
  register: UseFormRegister<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  register,
  errors,
  showPassword,
  setShowPassword,
}) => {
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className={s.form__field_size}>
      <FormControl error={!!errors.password} fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
        <OutlinedInput
          label="Password"
          error={!!errors.password}
          id="outlined-adornment-password"
          {...register('password')}
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
          {errors.password ? (
            <ListItemIcon>
              <ErrorIcon color="error" />
              {errors.password.message}
            </ListItemIcon>
          ) : (
            ''
          )}
        </FormHelperText>
      </FormControl>
    </div>
  );
};

export default PasswordInput;
