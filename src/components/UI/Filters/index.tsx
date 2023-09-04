import SortingBlock from '../SortingBlock';
import FilterBlock from '../FilterBlock';
import s from './Filters.module.scss';
import CatalogBreadcrumbs from '../CatalogBreadcrumbs';
import clsx from 'clsx';
import { Typography } from '../Typography';
import { useState } from 'react';

function Filters({ className }: JSX.IntrinsicElements['div']) {
  const [open, setOpen] = useState(false);
  return (
    <div className={clsx(s.group, className)}>
      <div className={s.block}>
        <CatalogBreadcrumbs />
        <button className={s.show} onClick={() => setOpen((open) => !open)}>
          <Typography
            variant={'subtitle'}
            as={'span'}
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
}

export default Filters;
