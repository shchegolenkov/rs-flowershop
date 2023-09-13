import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import * as yup from 'yup';
import { Resolver, useForm, UseFormProps } from 'react-hook-form';
import { ThemeProvider } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';

import s from './LoginPage.module.scss';
import FormTheme from '../../themes/FormTheme';
import { Typography } from '../../components/UI/Typography';
import Button from '../../components/UI/Button';
import EmailInput from '../../components/UI/FormFields/EmailInput';
import PasswordInput from '../../components/UI/FormFields/PasswordInput';
import { CustomerData } from '../../types/types';
import { useDispatch } from 'react-redux';
import { clearMessage } from '../../app/slices/message';
import { getUser, loginUser } from '../../app/slices/auth';
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import Alert from '@mui/material/Alert';
import isEmail from 'validator/lib/isEmail';

const LoginPage: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { message } = useSelector((state: RootState) => state.message);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required.')
      .email('Invalid email (e.g., example@example.com)')
      .test('is-valid', 'Invalid email (e.g., example@example.com)', (value) =>
        value
          ? isEmail(value)
          : new yup.ValidationError('Invalid email (e.g., example@example.com)')
      ),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter (e.g., [A-Z])')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter (e.g., [a-z])')
      .matches(/[0-9]/, 'Password must contain at least one digit (e.g., [0-9])')
      .matches(
        /[!@#$%^&*]/,
        'Password must contain at least one special character (e.g., !@#$%^&*)'
      )
      .matches(/^\S*$/, 'Password cannot contain spaces'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerData>({
    resolver: yupResolver(schema) as unknown as Resolver<CustomerData>,
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  } as UseFormProps<CustomerData>);

  const onSubmit = (data: CustomerData) => {
    setIsSuccess(false);
    dispatch(clearMessage());
    dispatch(loginUser(data))
      .unwrap()
      .then(() => dispatch(getUser()))
      .then(() => {
        setIsSuccess(true);
      })
      .catch(() => {
        setIsSuccess(false);
      });
  };

  return (
    <main>
      <div className={s.imageBlock}></div>
      <div className={s.grid}>
        <div className={s.headerBlock}>
          <div className={s.wrapper}>
            <Typography variant={'h2'} className={s.h2}>
              Welcome back!<br></br>Let`s log in
            </Typography>
            <div className={s.regBlock}>
              <Typography variant={'body'} className={s.body}>
                No account yet?
              </Typography>
              <Button
                className={clsx(s.button, s.buttonSignUp)}
                variant="secondary"
                onClick={() => {
                  const path = '/register';
                  navigate(path);
                }}
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className={s.wrapper}>
            <ThemeProvider theme={FormTheme}>
              <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <EmailInput register={register} errors={errors} />
                <PasswordInput
                  register={register}
                  name={'password'}
                  err={errors.password}
                  errMessage={errors.password?.message}
                  label={'Password *'}
                  id={'password-login'}
                />
                <Button full={true} type="submit" className={s.buttonLogin}>
                  Login
                </Button>
                {isSuccess ? (
                  <Alert severity="success" variant="outlined">
                    Successful!
                  </Alert>
                ) : null}
                {message ? (
                  <Alert variant="outlined" severity="error">
                    {message}
                  </Alert>
                ) : null}
              </form>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
