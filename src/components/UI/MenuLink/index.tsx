import { MouseEventHandler } from 'react';

import clsx from 'clsx';
import { Link, LinkProps } from 'react-router-dom';

import s from './MenuLink.module.scss';

interface MenuLink extends LinkProps {
  ico?: JSX.Element;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export const MenuLink = ({ children, className = '', ico, onClick, ...props }: MenuLink) => {
  return (
    <Link
      className={clsx(className, {
        [s.linkIco]: !!ico,
        [s.link]: !ico,
      })}
      onClick={onClick}
      {...props}
    >
      {ico}
      {children}
    </Link>
  );
};
