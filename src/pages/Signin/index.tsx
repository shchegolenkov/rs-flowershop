import React, { useState } from 'react';
import s from './Singin.module.scss';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { ThemeProvider } from '@mui/material/styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import RootLayout from '../../layouts/index';
import { Typography } from '../../components/ui/Typography';
import FormTheme from '../../themes/FormTheme';
import { validateEmail } from '../../utils/validators';
import { CustomerData } from '../../types/types';
import EmailInput from '../../components/UI/EmailInput';
import PasswordInput from '../../components/UI/PasswordInput';

const Signin: React.FC = () => {
  const [emailError, setEmailError] = useState('');

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email (e.g., example@example.com)')
      .test('custom-email-validation', `${emailError}`, (value) => {
        return validateEmail(value as string, setEmailError);
      })
      .matches(/^\S[^]*\S$/, 'Email should not contain spaces at the beginning or end'),
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
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: CustomerData) => {
    console.log(data);
  };

  return (
    <RootLayout>
      <div className={s.main}>
        <div className={clsx(s.elements__flow, s.signin__header, s.signin__header_flow)}>
          <div className={clsx(s.form__element, s.signin__header_element, s.header__img)}></div>
          <div className={clsx(s.form__element, s.signin__header_element, s.header__message)}>
            <div className={s.header__message_container}>
              <Typography variant="h2" className={s.welcome}>
                Welcome! Create
                <br /> your account now
              </Typography>
              <span className={s.login__text}>
                Already have an account?
                <Link to="/login" className={s.login__link}>
                  <button className={s.login__btn}>LOG IN</button>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ThemeProvider theme={FormTheme}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={clsx(s.elements__flow)}>
            <div className={clsx(s.form__element, s.form__element_left)}>
              <Typography variant="h2" className={s.form__title_size}>
                1. Account Info
              </Typography>
            </div>
            <div className={clsx(s.form__element, s.form__element_right, s.form__element_flow)}>
              <EmailInput register={register} errors={errors} />
              <PasswordInput register={register} errors={errors} />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </ThemeProvider>
    </RootLayout>
  );
};
export default Signin;
