import { MenuLink } from '@/components/UI/MenuLink';
import { Typography } from '@/components/UI/Typography';

import { RouteLinks } from '@/types/types';

import LogoIcon from '@/assets/svg/logo.svg';

import s from './Footer.module.scss';

const links = [
  { to: RouteLinks.CATALOG, text: 'All products' },
  { to: RouteLinks.CATALOG_FRESH, text: 'Fresh Flowers' },
  { to: RouteLinks.CATALOG_DRY, text: 'Dried Flowers' },
  { to: RouteLinks.CATALOG_LIVE, text: 'Live Plants' },
  { to: RouteLinks.CATALOG_CANDLES, text: 'Aroma Candles' },
  { to: RouteLinks.CATALOG_FRESHENERS, text: 'Freshener Diffuser' },
];

const Footer = () => {
  return (
    <footer className={s.layout}>
      <div className={s.item}>
        <Typography as="h5" className={s.header}>
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
        <Typography as="h5" className={s.header}>
          Info
        </Typography>
        <ul className={s.list}>
          <li>
            <MenuLink to={RouteLinks.ABOUT}>About us</MenuLink>
          </li>
        </ul>
      </div>
      <div className={`${s.item} ${s.itemLogo}`}>
        <LogoIcon />
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
};

export default Footer;
