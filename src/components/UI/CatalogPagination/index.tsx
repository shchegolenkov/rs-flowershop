import { ChangeEvent } from 'react';

import { Pagination } from '@mui/material';
import { PaginationProps } from '@mui/material/Pagination/Pagination';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import { selectProducts } from '@/app/selectors';
import { setPage } from '@/app/slices/catalog';
import { AppDispatch } from '@/app/store';

import s from './CatalogPagination.module.scss';

const CatalogPagination = ({ className = '' }: PaginationProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { pages, page } = useSelector(selectProducts);

  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
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
};

export default CatalogPagination;
