import { useEffect, useState } from 'react';
import { fetchProducts } from '../../app/slices/catalog';
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';
import CatalogCards from '../../components/UI/CatalogCards';
import s from './CatalogPage.module.scss';
import { Pagination } from '@mui/material';
import { ITEMS_PER_PAGE } from '../../constants/const';

function CatalogPage() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  const { queryResult } = useSelector((state: RootState) => state.products);
  const totalPages = Math.ceil(queryResult?.total / ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(fetchProducts(page));
  }, [dispatch, page]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <main>
      <div className={s.wrapper}>
        <CatalogCards className={s.items} />
        <Pagination
          count={totalPages || 1}
          onChange={handleChange}
          shape="rounded"
          className={s.pagination}
        />
      </div>
    </main>
  );
}

export default CatalogPage;
