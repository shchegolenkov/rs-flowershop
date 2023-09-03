import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetCatalogState, setCategory, setFilters } from '../../../app/slices/catalog';
import { AppDispatch } from '../../../app/store';
import { Categories } from '../../../types/types';
import { Typography } from '../../../components/UI/Typography';
import s from '../CatalogPage.module.scss';

function LivePlantsPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setCategory(Categories.LIVE));
    dispatch(setFilters());
    return () => {
      dispatch(resetCatalogState());
    };
  }, [dispatch]);
  return (
    <div className={s.wrapper}>
      <Typography variant={'h1'} className={s.name}>
        Perfect fresh flowers
      </Typography>
    </div>
  );
}

export default LivePlantsPage;
