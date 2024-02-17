import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Typography } from '../Typography';

import { RootState } from '@/app/store';
import { Categories } from '@/types/types';

import s from './CatalogBreadcrumbs.module.scss';

function CatalogBreadcrumbs() {
  const { category } = useSelector((state: RootState) => state.products);

  const links = [
    { to: './fresh-flowers', text: 'fresh flowers' },
    { to: './dried-flowers', text: 'dried flowers' },
    { to: './live-plants', text: 'live plants' },
    { to: './fresheners', text: 'fresheners' },
    { to: './candles', text: 'candles' },
  ];

  const categoriesNames = {
    [`categories.id:${Categories.FRESH}`]: 'Fresh flowers',
    [`categories.id:${Categories.DRY}`]: 'Dried flowers',
    [`categories.id:${Categories.LIVE}`]: 'Live plants',
    [`categories.id:${Categories.FRESHENERS}`]: 'Fresheners',
    [`categories.id:${Categories.CANDLES}`]: 'Candles',
  };

  return (
    <nav className={s.nav}>
      {category ? (
        <>
          <Link to="./" className={s.link}>
            <Typography variant="overline" as="span">
              Catalog
            </Typography>
          </Link>
          <Typography variant="overline" as="span">
            /{categoriesNames[category]}
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="overline">Catalog/</Typography>
          <ul className={s.links}>
            {links.map(({ to, text }) => (
              <li key={to} className={s.listItem}>
                <Link to={to} className={s.link}>
                  <Typography variant="overline" as="span">
                    {text}
                  </Typography>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </nav>
  );
}

export default CatalogBreadcrumbs;
