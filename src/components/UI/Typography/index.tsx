import { ElementType, ReactNode } from 'react';

import clsx from 'clsx';

import s from './Typography.module.scss';

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'subtitle'
  | 'caption'
  | 'captionSmall'
  | 'captionBold'
  | 'overline';

interface TypographyProps<T extends ElementType> {
  as?: T;
  className?: string;
  children?: ReactNode;
  variant?: TypographyVariant;
}

export const Typography = <T extends ElementType = 'p'>({
  as,
  className,
  variant = 'body',
  children,
}: TypographyProps<T>) => {
  let Tag = as ?? 'p';

  if (variant.includes('h')) {
    Tag = as ?? variant;
  }

  return (
    <Tag
      className={clsx(className, {
        [s[variant]]: variant,
      })}
    >
      {children}
    </Tag>
  );
};
