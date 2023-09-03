import CatalogCards from '../../components/UI/CatalogCards';
import CatalogPagination from '../../components/UI/CatalogPagination';
import SearchBar from '../../components/UI/SearchBar';
import Filters from '../../components/UI/Filters';
import s from './CatalogLayout.module.scss';
import { Outlet } from 'react-router-dom';

function CatalogLayout() {
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
}

export default CatalogLayout;
