import React from 'react';
import s from './LoginPage.module.scss';

import { Typography } from '../../components/UI/Typography';

const LoginPage: React.FC = () => {
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
