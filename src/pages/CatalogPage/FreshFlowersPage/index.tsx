import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { resetCatalogState, setCategory, setFilters } from '@/app/slices/catalog';
import { AppDispatch } from '@/app/store';
import { Typography } from '@/components/UI/Typography';
import { Categories } from '@/types/types';

import s from '../CatalogPage.module.scss';

function FreshFlowersPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setCategory(Categories.FRESH));
    dispatch(setFilters());
    return () => {
      dispatch(resetCatalogState());
    };
  }, [dispatch]);
  return (
    <div className={s.wrapper}>
      <Typography variant="h1">Perfect fresh flowers</Typography>
    </div>
  );
}

export default FreshFlowersPage;
