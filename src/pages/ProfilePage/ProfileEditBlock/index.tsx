import clsx from 'clsx';

import Button from '@/components/UI/Button';

import s from '../ProfilePage.module.scss';

interface ProfileEditBlock {
  onClickSubmit: () => void;
  onClickCancel: () => void;
  disabled: boolean;
}

const ProfileEditBlock = ({ onClickSubmit, onClickCancel, disabled = false }: ProfileEditBlock) => {
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
