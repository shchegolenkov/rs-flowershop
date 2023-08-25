import LogoIco from '../../../assets/svg/logo.svg';
import { Typography } from '../../../components/UI/Typography';
import { MenuLink } from '../../../components/UI/MenuLink';
import s from './Footer.module.scss';

const links = [
  { to: '/notFound', text: 'All products' },
  { to: '/notFound', text: 'Fresh Flowers' },
  { to: '/notFound', text: 'Dried Flowers' },
  { to: '/notFound', text: 'Live Plants' },
  { to: '/notFound', text: 'Aroma Candles' },
  { to: '/notFound', text: 'Freshener Diffuser' },
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
