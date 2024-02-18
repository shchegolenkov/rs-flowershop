import clsx from 'clsx';
import { Link, LinkProps } from 'react-router-dom';

import s from './MenuLink.module.scss';

interface IMenuLink extends LinkProps {
  ico?: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export const MenuLink = ({ children, className, ico, onClick, ...props }: IMenuLink) => {
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
