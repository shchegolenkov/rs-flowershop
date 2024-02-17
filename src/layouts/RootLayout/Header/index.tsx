import { useState, useRef, useEffect, MutableRefObject } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { logoutUser, tokenIntrospection } from '@/app/slices/auth';

import { RootState, AppDispatch } from '@/app/store';

import { MenuLink } from '@/components/UI/MenuLink';

import { Typography } from '@/components/UI/Typography';

import { Logout } from '@/types/types';

import CartIco from '@/assets/svg/cart.svg';
import CloseIco from '@/assets/svg/close.svg';
import LoginIco from '@/assets/svg/login.svg';
import logoIco from '@/assets/svg/logo.svg?url';
import LogoutIco from '@/assets/svg/logout.svg';
import MenuIco from '@/assets/svg/menu.svg';
import ProfileIco from '@/assets/svg/person.svg';

import s from './header.module.scss';

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
  const { isLoggedIn, accessToken, refreshToken } = useSelector((state: RootState) => state.auth);

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
      document.body.style.overflowY = 'hidden';
    }

    document.addEventListener('mousedown', checkOutside);

    return () => {
      document.removeEventListener('mousedown', checkOutside);
      document.body.style.overflowY = 'scroll';
    };
  }, [dispatch, isMenuActive]);

  function handleMenuClick() {
    setMenuActive(!isMenuActive);
  }

  const handleLogout = () => {
    if (accessToken && refreshToken) {
      const data: Logout = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      dispatch(logoutUser(data));
    }
  };

  return (
    <>
      <header>
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
                <MenuLink
                  to={link.to}
                  onClick={() => {
                    setMenuActive(false);
                  }}
                >
                  {link.text}
                </MenuLink>
              </li>
            ))}
            {isLoggedIn ? (
              <>
                <li className={s.listItem}>
                  <MenuLink
                    to="/"
                    ico={<LogoutIco />}
                    onClick={() => {
                      handleLogout();
                      setMenuActive(false);
                    }}
                  >
                    Log Out
                  </MenuLink>
                </li>
                <li className={s.listItem}>
                  <MenuLink
                    to="/profile"
                    ico={<ProfileIco />}
                    onClick={() => {
                      setMenuActive(false);
                    }}
                  >
                    Profile
                  </MenuLink>
                </li>
              </>
            ) : (
              anonymLinks.map((link) => (
                <li key={link.text} className={s.listItem}>
                  <MenuLink
                    to={link.to}
                    ico={link.ico}
                    onClick={() => {
                      setMenuActive(false);
                    }}
                  >
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
              <Typography className={s.counter} variant="captionSmall">
                {cartData && cartData.totalLineItemQuantity ? cartData.totalLineItemQuantity : '0'}
              </Typography>
            </MenuLink>
          </div>
        </nav>
      </header>
      {isMenuActive && <div className={s.bg} ref={ref}></div>}
    </>
  );
}

export default Header;
