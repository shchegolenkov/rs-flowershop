import { useState, useRef, useEffect } from 'react';

import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import { selectAuth, selectCart } from '@/app/selectors';
import { logoutUser, tokenIntrospection } from '@/app/slices/auth';
import { AppDispatch } from '@/app/store';

import { MenuLink } from '@/components/UI/MenuLink';
import { Typography } from '@/components/UI/Typography';

import { Logout, RouteLinks } from '@/types/types';

import CartIco from '@/assets/svg/cart.svg';
import CloseIco from '@/assets/svg/close.svg';
import LoginIco from '@/assets/svg/login.svg';
import logoIco from '@/assets/svg/logo.svg?url';
import LogoutIco from '@/assets/svg/logout.svg';
import MenuIco from '@/assets/svg/menu.svg';
import ProfileIco from '@/assets/svg/person.svg';

import s from './header.module.scss';

const links = [
  { to: RouteLinks.CATALOG, text: 'Catalog' },
  { to: RouteLinks.ABOUT, text: 'About us' },
];

const anonymLinks = [
  { to: RouteLinks.LOGIN, text: 'Log In', icon: <LoginIco /> },
  { to: RouteLinks.REGISTER, text: 'Sign up', icon: <ProfileIco /> },
];

const Header = () => {
  const { cartData } = useSelector(selectCart);
  const { isLoggedIn, accessToken, refreshToken } = useSelector(selectAuth);

  const ref = useRef<HTMLDivElement | null>(null);

  const [isMenuActive, setMenuActive] = useState(false);

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
            <MenuLink to={RouteLinks.MAIN}>
              <img src={logoIco} className={s.logoIco} alt="logo" />
            </MenuLink>
          </div>
          <ul className={clsx(s.items, { [s.active]: isMenuActive })}>
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
                    to={RouteLinks.MAIN}
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
                    to={RouteLinks.PROFILE}
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
                    ico={link.icon}
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
          <div className={clsx(s.menuOpen, s.ico)}>
            <button onClick={handleMenuClick}>
              <MenuIco />
            </button>
          </div>
          <div className={s.ico}>
            <MenuLink to={RouteLinks.CART} className={s.cartLink}>
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
};

export default Header;
