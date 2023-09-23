import React from 'react';
import clsx from 'clsx';
import s from '../ProfilePage.module.scss';
import Button from '../../../components/UI/Button';

interface ProfileEditBlockProps {
  onClickSubmit: () => void;
  onClickCancel: () => void;
  disabled: boolean;
}

const ProfileEditBlock: React.FC<ProfileEditBlockProps> = ({
  onClickSubmit,
  onClickCancel,
  disabled = false,
}) => {
  return (
    <div className={clsx(s.width_full)}>
      <div className={clsx(s.save_edit_container)}>
        <Button type="submit" variant="secondary" disabled={disabled} onClick={onClickSubmit}>
          SAVE EDIT
        </Button>
        <Button type="button" variant="underlined" disabled={disabled} onClick={onClickCancel}>
          Cancel edit
        </Button>
      </div>
    </div>
  );
};

export default ProfileEditBlock;
