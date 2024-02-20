import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Typography } from '../Typography';

import { selectProducts } from '@/app/selectors';
import { Categories, RouteLinks } from '@/types/types';

import s from './CatalogBreadcrumbs.module.scss';

const CatalogBreadcrumbs = () => {
  const { category } = useSelector(selectProducts);

  const links = [
    { to: RouteLinks.CATALOG_FRESH, text: 'fresh flowers' },
    { to: RouteLinks.CATALOG_DRY, text: 'dried flowers' },
    { to: RouteLinks.CATALOG_LIVE, text: 'live plants' },
    { to: RouteLinks.CATALOG_FRESHENERS, text: 'fresheners' },
    { to: RouteLinks.CATALOG_CANDLES, text: 'candles' },
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
          <Link to={RouteLinks.CATALOG} className={s.link}>
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
};

export default CatalogBreadcrumbs;
