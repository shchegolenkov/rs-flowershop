import { MouseEventHandler } from 'react';

import clsx from 'clsx';
import { Link, LinkProps } from 'react-router-dom';

import s from './MenuLink.module.scss';

interface MenuLink extends LinkProps {
  icon?: JSX.Element;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export const MenuLink = ({ children, className = '', icon, onClick, ...props }: MenuLink) => {
  return (
    <Link
      className={clsx(className, {
        [s.linkIcon]: !!icon,
        [s.link]: !icon,
      })}
      onClick={onClick}
      {...props}
    >
      {icon}
      {children}
    </Link>
  );
};
