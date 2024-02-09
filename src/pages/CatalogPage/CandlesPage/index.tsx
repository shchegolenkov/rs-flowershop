import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { resetCatalogState, setCategory, setFilters } from '../../../app/slices/catalog';
import { AppDispatch } from '../../../app/store';
import { Typography } from '../../../components/UI/Typography';
import { Categories } from '../../../types/types';

import s from '../CatalogPage.module.scss';

function CandlesPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setCategory(Categories.CANDLES));
    dispatch(setFilters());
    return () => {
      dispatch(resetCatalogState());
    };
  }, [dispatch]);
  return (
    <div className={s.wrapper}>
      <Typography variant={'h1'}>Aroma therapy</Typography>
    </div>
  );
}

export default CandlesPage;
