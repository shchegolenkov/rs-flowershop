import React from 'react';
import RootLayout from '../../layouts/index';
import clsx from 'clsx';
import { Typography } from '../../components/ui/Typography';
import s from './Singin.module.scss';

const Signin: React.FC = () => {
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
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};
export default Signin;
