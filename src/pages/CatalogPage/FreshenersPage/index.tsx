import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { resetCatalogState, setCategory, setFilters } from '../../../app/slices/catalog';
import { AppDispatch } from '../../../app/store';
import { Typography } from '../../../components/UI/Typography';
import { Categories } from '../../../types/types';

import s from '../CatalogPage.module.scss';

function FreshenersPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setCategory(Categories.FRESHENERS));
    dispatch(setFilters());
    return () => {
      dispatch(resetCatalogState());
    };
  }, [dispatch]);
  return (
    <div className={s.wrapper}>
      <Typography variant={'h1'}>Mood in the house</Typography>
    </div>
  );
}

export default FreshenersPage;
