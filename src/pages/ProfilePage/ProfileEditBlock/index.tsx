import React from 'react';
import clsx from 'clsx';
import s from '../ProfilePage.module.scss';
import Alert from '@mui/material/Alert';
import Button from '../../../components/UI/Button';

interface ProfileEditBlockProps {
  onClickSubmit: () => void;
  onClickCancel: () => void;
  formError: boolean;
  isSuccess: boolean;
  message: string | null;
}

const ProfileEditBlock: React.FC<ProfileEditBlockProps> = ({
  onClickSubmit,
  onClickCancel,
  formError,
  isSuccess,
  message,
}) => {
  return (
    <div className={clsx(s.width_full)}>
      <div className={clsx(s.save_edit_container)}>
        <Button type="submit" variant="secondary" onClick={onClickSubmit}>
          SAVE EDIT
        </Button>
        <Button type="button" variant="underlined" onClick={onClickCancel}>
          Cancel edit
        </Button>
      </div>
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

export default ProfileEditBlock;
