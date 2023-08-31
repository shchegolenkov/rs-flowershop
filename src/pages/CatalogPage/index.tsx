import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from '@mui/material';
import { AppDispatch, RootState } from '../../app/store';
import { fetchProducts } from '../../app/slices/catalog';
import CatalogCards from '../../components/UI/CatalogCards';
import SearchBar from '../../components/UI/SearchBar';
import s from './CatalogPage.module.scss';

function CatalogPage() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  const { pages } = useSelector((state: RootState) => state.products);
  const totalPages = pages;
  useEffect(() => {
    dispatch(fetchProducts(page));
  }, [dispatch, page]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <main>
      <div className={s.wrapper}>
        <SearchBar className={s.search} />
        <CatalogCards className={s.items} />
        <Pagination
          count={totalPages}
          onChange={handleChange}
          shape="rounded"
          className={s.pagination}
        />
      </div>
    </main>
  );
}

export default CatalogPage;
