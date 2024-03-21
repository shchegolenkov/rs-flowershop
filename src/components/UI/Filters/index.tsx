import { useState } from 'react';

import clsx from 'clsx';

import CatalogBreadcrumbs from '../CatalogBreadcrumbs';
import FilterBlock from '../FilterBlock';
import SortingBlock from '../SortingBlock';
import { Typography } from '../Typography';

import s from './Filters.module.scss';

const Filters = ({ className = '' }: JSX.IntrinsicElements['div']) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={clsx(s.group, className)}>
      <div className={s.block}>
        <CatalogBreadcrumbs />
        <button className={s.show} onClick={() => setOpen((open) => !open)}>
          <Typography
            variant="subtitle"
            as="span"
            className={clsx(s.showCaption, [open && s.showActive])}
          >
            Show advanced search options
          </Typography>
        </button>
        <div className={clsx(s.options, [open && s.optionsActive])}>
          <SortingBlock />
          <FilterBlock />
        </div>
      </div>
    </div>
  );
};

export default Filters;
