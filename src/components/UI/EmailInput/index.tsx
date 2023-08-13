import s from './EmailInput.module.scss';
import TextField from '@mui/material/TextField';
import { ListItemIcon, ListItemText } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';

const EmailInput = ({ register, errors }) => {
  return (
    <div className={s.form__felds_flow_size}>
      <div className={s.input_size}>
        <TextField
          fullWidth
          label="Email *"
          error={!!errors.email}
          id="outlined-basic"
          {...register('email')}
          helperText={
            errors.email ? (
              <ListItemText>
                {errors.email ? (
                  <ListItemIcon>
                    <ErrorIcon color="error" /> {errors.email.message}
                  </ListItemIcon>
                ) : (
                  ''
                )}
              </ListItemText>
            ) : (
              ''
            )
          }
        />
      </div>
    </div>
  );
};

export default EmailInput;
