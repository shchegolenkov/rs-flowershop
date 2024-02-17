import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { resetCatalogState, setFilters } from '@/app/slices/catalog';
import { AppDispatch } from '@/app/store';
import { Typography } from '@/components/UI/Typography';

import s from './CatalogPage.module.scss';

const CatalogPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setFilters());
    return () => {
      dispatch(resetCatalogState());
    };
  }, [dispatch]);

  return (
    <div className={s.wrapper}>
      <Typography variant="h1">Find the best flowers and gifts</Typography>
    </div>
  );
};

export default CatalogPage;
