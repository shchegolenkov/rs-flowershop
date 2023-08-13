import { Link, LinkProps } from 'react-router-dom';
import s from './MenuLink.module.scss';
import clsx from 'clsx';

interface IMenuLink extends LinkProps {
  ico?: JSX.Element;
}

export function MenuLink({ children, className, ico, ...props }: IMenuLink) {
  return (
    <Link className={ico ? clsx(s.linkIco, className) : clsx(s.link, className)} {...props}>
      {ico}
      {children}
    </Link>
  );
}
