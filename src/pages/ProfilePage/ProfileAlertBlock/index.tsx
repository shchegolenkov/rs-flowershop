import Alert from '@mui/material/Alert';
import clsx from 'clsx';

import s from '../ProfilePage.module.scss';

interface ProfileAlertBlock {
  formError: boolean;
  isSuccess: boolean;
  message: string | null;
}

const ProfileAlertBlock = ({ formError, isSuccess, message }: ProfileAlertBlock) => {
  return (
    <div className={clsx(s.width_full)}>
      <div className={s.alert_position}>
        {formError ? (
          <Alert variant="outlined" severity="error">
            Something went wrong - please check the form!
          </Alert>
        ) : null}
        {isSuccess ? (
          <Alert severity="success" variant="outlined">
            Data updated successfully!
          </Alert>
        ) : null}
        {message ? (
          <Alert variant="outlined" severity="error">
            {message}
          </Alert>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileAlertBlock;
