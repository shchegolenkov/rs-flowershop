import { Outlet } from 'react-router-dom';

import CatalogCards from '@/components/UI/CatalogCards';
import CatalogPagination from '@/components/UI/CatalogPagination';
import Filters from '@/components/UI/Filters';
import SearchBar from '@/components/UI/SearchBar';

import s from './CatalogLayout.module.scss';

const CatalogLayout = () => {
  return (
    <>
      <main>
        <Outlet />
        <div className={s.wrapper}>
          <Filters className={s.filter} />
          <SearchBar className={s.search} />
          <CatalogCards className={s.items} />
          <CatalogPagination className={s.pagination} />
        </div>
      </main>
    </>
  );
};

export default CatalogLayout;
