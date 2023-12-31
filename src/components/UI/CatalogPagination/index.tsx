import clsx from 'clsx';
import { Pagination } from '@mui/material';
import { PaginationProps } from '@mui/material/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../../app/slices/catalog';
import { AppDispatch, RootState } from '../../../app/store';
import s from './CatalogPagination.module.scss';

function CatalogPagination({ className }: PaginationProps) {
  const dispatch = useDispatch<AppDispatch>();

  const { pages, page } = useSelector((state: RootState) => state.products);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
  };

  return (
    <Pagination
      count={pages}
      page={page}
      onChange={handleChange}
      shape="rounded"
      className={clsx(s.pagination, className)}
    />
  );
}

export default CatalogPagination;
