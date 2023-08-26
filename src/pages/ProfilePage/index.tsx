import React, { useEffect } from 'react';
import s from './ProfilePage.module.scss';
import clsx from 'clsx';
import { Typography } from '../../components/UI/Typography';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import FormTheme from '../../themes/FormTheme';
import { ThemeProvider } from '@mui/material/styles';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);
  const onSubmit = () => {
    console.log('submit button clicked');
  };
  return (
    <main>
      <div className={s.container}>
        <div className={clsx(s.elements__flow, s.profile__header, s.profile__header_flow)}>
          <div className={clsx(s.form__element, s.profile__header_element, s.header__img)}></div>
          <div className={clsx(s.form__element, s.profile__header_element, s.header__message)}>
            <Typography variant="h2">Profile Account</Typography>
          </div>
        </div>
      </div>
      <ThemeProvider theme={FormTheme}>
        <form onSubmit={onSubmit}>
          <div className={clsx(s.elements__flow)}>
            <div className={clsx(s.form__element, s.form__element_left)}>
              <Typography variant="h2" className={s.form__title_size}>
                1. Account Info
              </Typography>
            </div>
            <div className={clsx(s.form__element, s.form__element_flow)}></div>
          </div>
          <div className={clsx(s.elements__flow)}>
            <div className={clsx(s.form__element, s.form__element_left)}>
              <Typography variant="h2" className={s.form__title_size}>
                2. User Info
              </Typography>
            </div>
            <div className={clsx(s.form__element, s.form__element_flow)}></div>
          </div>
        </form>
      </ThemeProvider>
    </main>
  );
};
export default ProfilePage;
