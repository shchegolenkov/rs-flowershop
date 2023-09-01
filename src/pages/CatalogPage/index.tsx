import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../app/slices/catalog';
import { AppDispatch } from '../../app/store';
import CatalogCards from '../../components/UI/CatalogCards';
import CatalogPagination from '../../components/UI/CatalogPagination';
import SearchBar from '../../components/UI/SearchBar';
import Filters from '../../components/UI/Filters';
import s from './CatalogPage.module.scss';

function CatalogPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <main>
      <div className={s.wrapper}>
        <Filters className={s.filter} />
        <SearchBar className={s.search} />
        <CatalogCards className={s.items} />
        <CatalogPagination className={s.pagination} />
      </div>
    </main>
  );
}

export default CatalogPage;
