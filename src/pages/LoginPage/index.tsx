import React from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import s from './LoginPage.module.scss';
import Button from '../../components/UI/Button';
import { Typography } from '../../components/UI/Typography';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

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
          <div className={s.wrapper}></div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
