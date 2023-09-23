import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, UseFormProps, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import s from './PasswordPage.module.scss';

import * as yup from 'yup';

import { PasswordForm, Status } from '../../types/types';
import { clearMessage } from '../../app/slices/message';
import { AppDispatch, RootState } from '../../app/store';
import { changePassword } from '../../app/slices/profile';
import { getUser, loginUser } from '../../app/slices/auth';

import { ThemeProvider } from '@mui/material/styles';
import { Typography } from '../../components/UI/Typography';
import FormTheme from '../../themes/FormTheme';
import ProfileEditBlock from '../ProfilePage/ProfileEditBlock';
import PasswordInput from '../../components/UI/FormFields/PasswordInput';
import ProfileAlertBlock from '../ProfilePage/ProfileAlertBlock';

const PasswordPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { message } = useSelector((state: RootState) => state.message);
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  const { status } = useSelector((state: RootState) => state.profile);

  const [formError, setFormError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const schema = yup.object().shape({
    currentPassword: yup
      .string()
      .required('Password is required.')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter (e.g., [A-Z])')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter (e.g., [a-z])')
      .matches(/[0-9]/, 'Password must contain at least one digit (e.g., [0-9])')
      .matches(
        /[!@#$%^&*]/,
        'Password must contain at least one special character (e.g., !@#$%^&*)'
      )
      .matches(/^\S*$/, 'Password cannot contain spaces.'),
    newPassword: yup
      .string()
      .required('Password is required.')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter (e.g., [A-Z])')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter (e.g., [a-z])')
      .matches(/[0-9]/, 'Password must contain at least one digit (e.g., [0-9])')
      .matches(
        /[!@#$%^&*]/,
        'Password must contain at least one special character (e.g., !@#$%^&*)'
      )
      .matches(/^\S*$/, 'Password cannot contain spaces.'),
    confirmNewPassword: yup
      .string()
      .required('Password is required.')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter (e.g., [A-Z])')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter (e.g., [a-z])')
      .matches(/[0-9]/, 'Password must contain at least one digit (e.g., [0-9])')
      .matches(
        /[!@#$%^&*]/,
        'Password must contain at least one special character (e.g., !@#$%^&*)'
      )
      .matches(/^\S*$/, 'Password cannot contain spaces.')
      .oneOf([yup.ref('newPassword')], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordForm>({
    resolver: yupResolver(schema) as unknown as Resolver<PasswordForm>,
    mode: 'onChange',
  } as UseFormProps<PasswordForm>);

  const onSubmit = async (data: PasswordForm) => {
    if (user) {
      const submitData = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };
      try {
        const response = await dispatch(changePassword(submitData));
        if (!response.payload) {
          setIsSuccess(false);
          return;
        }
        setIsSuccess(true);
        const loginData = {
          email: user.email,
          password: data.newPassword,
        };
        await dispatch(loginUser(loginData));
        await dispatch(getUser());
        setTimeout(() => {
          dispatch(clearMessage());
          setIsSuccess(false);
          reset();
          navigate('/profile');
        }, 2000);
      } catch (error) {
        console.error('Failed to reset password:', error);
      }
    }
  };

  const onClickSubmit = () => {
    setFormError(false);
    if (errors.currentPassword || errors.newPassword || errors.confirmNewPassword) {
      setFormError(true);
    }
  };
  const onClickCancel = () => {
    reset();
    navigate('/profile');
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={clsx(s.elements__flow)}>
            <div className={clsx(s.form__element, s.form__element_left, s.no__border_bottom_left)}>
              <Typography variant="h2" className={s.form__title_size}>
                Change Password
              </Typography>
            </div>
            <div className={clsx(s.form__element, s.form__element_flow, s.no__border_bottom)}>
              <PasswordInput
                register={register}
                name={'currentPassword'}
                err={errors.currentPassword}
                errMessage={errors.currentPassword?.message}
                label={'Current password *'}
                id={'current-password'}
              />
              <PasswordInput
                register={register}
                name={'newPassword'}
                err={errors.newPassword}
                errMessage={errors.newPassword?.message}
                label={'New password *'}
                id={'new-password'}
              />
              <PasswordInput
                register={register}
                name={'confirmNewPassword'}
                err={errors.confirmNewPassword}
                errMessage={errors.confirmNewPassword?.message}
                label={'Confirm new password *'}
                id={'confirm-new-password'}
              />
              <ProfileEditBlock
                onClickSubmit={onClickSubmit}
                onClickCancel={onClickCancel}
                disabled={isSuccess || status === Status.LOADING}
              />
              <ProfileAlertBlock formError={formError} isSuccess={isSuccess} message={message} />
            </div>
          </div>
        </form>
      </ThemeProvider>
    </main>
  );
};

export default PasswordPage;
