import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetCatalogState, setCategory, setFilters } from '../../../app/slices/catalog';
import { AppDispatch } from '../../../app/store';
import { Categories } from '../../../types/types';
import { Typography } from '../../../components/UI/Typography';
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
      <Typography variant={'h1'} className={s.name}>
        Mood in the house
      </Typography>
    </div>
  );
}

export default FreshenersPage;
