import clsx from 'clsx';
import { Link, LinkProps } from 'react-router-dom';

import s from './MenuLink.module.scss';

interface IMenuLink extends LinkProps {
  ico?: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export function MenuLink({ children, className, ico, onClick, ...props }: IMenuLink) {
  return (
    <Link
      className={ico ? clsx(s.linkIco, className) : clsx(s.link, className)}
      onClick={onClick}
      {...props}
    >
      {ico}
      {children}
    </Link>
  );
}
