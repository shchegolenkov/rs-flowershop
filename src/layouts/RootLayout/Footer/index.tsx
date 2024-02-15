import { MenuLink } from '@/components/UI/MenuLink';
import { Typography } from '@/components/UI/Typography';

import LogoIco from '@/assets/svg/logo.svg';

import s from './Footer.module.scss';

const links = [
  { to: '/catalog', text: 'All products' },
  { to: '/catalog/fresh-flowers', text: 'Fresh Flowers' },
  { to: '/catalog/dried-flowers', text: 'Dried Flowers' },
  { to: '/catalog/live-plants', text: 'Live Plants' },
  { to: '/catalog/candles', text: 'Aroma Candles' },
  { to: '/catalog/fresheners', text: 'Freshener Diffuser' },
];

function Footer() {
  return (
    <footer className={s.layout}>
      <div className={s.item}>
        <Typography as={'h5'} className={s.header}>
          Catalog
        </Typography>
        <ul className={s.list}>
          {links.map((link) => (
            <li key={link.text}>
              <MenuLink to={link.to}>{link.text}</MenuLink>
            </li>
          ))}
        </ul>
      </div>
      <div className={s.item}>
        <Typography as={'h5'} className={s.header}>
          Info
        </Typography>
        <ul className={s.list}>
          <li>
            <MenuLink to={'/about'}>About us</MenuLink>
          </li>
        </ul>
      </div>
      <div className={`${s.item} ${s.itemLogo}`}>
        <LogoIco />
        <div>
          <Typography className={s.caption} variant="captionSmall">
            Rolling Scopes Flowers
          </Typography>
          <Typography className={s.caption} variant="captionSmall">
            2023
          </Typography>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
