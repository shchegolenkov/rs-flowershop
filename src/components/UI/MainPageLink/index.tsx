import { capitalize, map } from 'lodash';
import { Link } from 'react-router-dom';

import { Typography } from '../Typography';

import ArrowIco from '@/assets/svg/arrowLeft.svg';

import s from './MainPageLink.module.scss';

function MainPageLink({ to, title }: { to: string; title: string }) {
  const imgLink = map(title.split(' '), capitalize).join('');
  return (
    <section className={s.item}>
      <div className={s.cover}>
        <img className={s.coverImg} src={`images/${imgLink}Card.jpg`} alt={`${title} cover`} />
      </div>
      <Link className={s.link} to={to}>
        <Typography variant={'h3'} className={s.linkName}>
          {title}
        </Typography>
        <Typography variant={'subtitle'} className={s.arrow}>
          <ArrowIco />
          Shop now
          <ArrowIco />
        </Typography>
      </Link>
    </section>
  );
}

export default MainPageLink;
