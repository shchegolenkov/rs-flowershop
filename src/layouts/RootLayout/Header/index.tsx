import { useState, useRef, useEffect, MutableRefObject } from 'react';
import CartIco from '../../../assets/svg/cart.svg';
import logoIco from '../../../assets/svg/logo.svg?url';
import MenuIco from '../../../assets/svg/menu.svg';
import ProfileIco from '../../../assets/svg/person.svg';
import LoginIco from '../../../assets/svg/login.svg';
import CloseIco from '../../../assets/svg/close.svg';
import LogoutIco from '../../../assets/svg/logout.svg';
import { MenuLink } from '../../../components/UI/MenuLink';
import s from './header.module.scss';
import { useSelector } from 'react-redux';
import { logoutUser, tokenIntrospection } from '../../../app/slices/auth';
import { useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../app/store';
import { Typography } from '../../../components/UI/Typography';

const links = [
  { to: '/catalog', text: 'Catalog' },
  { to: '/about', text: 'About us' },
];

const anonymLinks = [
  { to: '/login', text: 'Log In', ico: <LoginIco /> },
  { to: '/register', text: 'Sign up', ico: <ProfileIco /> },
];

function Header() {
  const { cartData } = useSelector((state: RootState) => state.cart);
  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [isMenuActive, setMenuActive] = useState(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(tokenIntrospection());
    }

    const checkOutside = (e: MouseEvent) => {
      if (isMenuActive && ref.current && ref.current.contains(e.target as Node)) {
        setMenuActive(false);
      }
    };

    if (isMenuActive) {
      document.body.style.position = 'fixed';
    }

    document.addEventListener('mousedown', checkOutside);

    return () => {
      document.removeEventListener('mousedown', checkOutside);
      document.body.style.position = 'static';
    };
  }, [dispatch, isMenuActive]);

  function handleMenuClick() {
    setMenuActive(!isMenuActive);
  }

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header>
      {isMenuActive && <div className={s.bg} ref={ref}></div>}
      <nav className={s.nav}>
        <div className={s.ico}>
          <MenuLink to="/">
            <img src={logoIco} className={s.logoIco} alt="logo" />
          </MenuLink>
        </div>
        <ul className={!isMenuActive ? s.items : [s.items, s.active].join(' ')}>
          <li className={s.menuClose}>
            <button onClick={handleMenuClick}>
              <CloseIco />
            </button>
          </li>
          {links.map((link) => (
            <li key={link.text} className={s.listItem}>
              <MenuLink to={link.to}>{link.text}</MenuLink>
            </li>
          ))}
          {isLoggedIn ? (
            <>
              <li className={s.listItem}>
                <MenuLink to={'/'} ico={<LogoutIco />} onClick={handleLogout}>
                  Log Out
                </MenuLink>
              </li>
              <li className={s.listItem}>
                <MenuLink to={'/profile'} ico={<ProfileIco />}>
                  Profile
                </MenuLink>
              </li>
            </>
          ) : (
            anonymLinks.map((link) => (
              <li key={link.text} className={s.listItem}>
                <MenuLink to={link.to} ico={link.ico}>
                  {link.text}
                </MenuLink>
              </li>
            ))
          )}
          <li className={s.empty}></li>
        </ul>
        <div className={[s.menuOpen, s.ico].join(' ')}>
          <button onClick={handleMenuClick}>
            <MenuIco />
          </button>
        </div>
        <div className={s.ico}>
          <MenuLink to="/cart" className={s.cartLink}>
            <CartIco />
            <Typography className={s.counter} variant={'captionSmall'}>
              {cartData && cartData.totalLineItemQuantity ? cartData.totalLineItemQuantity : '0'}
            </Typography>
          </MenuLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
