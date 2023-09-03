import SortingBlock from '../SortingBlock';
import FilterBlock from '../FilterBlock';
import s from './Filters.module.scss';
import CatalogBreadcrumbs from '../CatalogBreadcrumbs';

function Filters({ className }: JSX.IntrinsicElements['div']) {
  return (
    <div className={className}>
      <div className={s.block}>
        <CatalogBreadcrumbs />
        <SortingBlock />
        <FilterBlock />
      </div>
    </div>
  );
}

export default Filters;
