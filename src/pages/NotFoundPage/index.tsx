import { useNavigate } from 'react-router-dom';

import Button from '@/components/UI/Button';
import { Typography } from '@/components/UI/Typography';

import s from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <main>
      <div className={s.grid}>
        <div className={s.content}>
          <div className={s.wrapper}>
            <Typography variant="overline" className={s.overline}>
              404 error
            </Typography>
            <Typography variant="h2" className={s.h2}>
              Page not found
            </Typography>
            <Typography variant="body">
              Sorry, the page you are looking for doesn`t exist or has been moved.
              <br />
              Came back to the main page — there is still a lot of interesting and beautiful.
            </Typography>
            <Button className={s.button} variant="secondary" onClick={handleBack}>
              Back to home
            </Button>
          </div>
        </div>
        <div className={s.imageBlock}></div>
      </div>
    </main>
  );
};

export default NotFoundPage;
