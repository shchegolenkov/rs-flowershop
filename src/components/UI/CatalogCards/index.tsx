import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { RootState } from '../../../app/store';
import { Status } from '../../../types/types';
import { Typography } from '../Typography';
import CatalogCard from '../CatalogCard';
import s from './CatalogCards.module.scss';

function CatalogCards({ className }: JSX.IntrinsicElements['div']) {
  const { status, queryResult } = useSelector((state: RootState) => state.products);
  return (
    <div className={clsx(s.wrapper, className)}>
      {status === Status.LOADING ? (
        <div className={s.items}>
          <Typography variant={'h2'}>Loading</Typography>
        </div>
      ) : (queryResult && queryResult?.total === 0) || status === Status.ERROR ? (
        <div className={clsx(s.items, s.notFound)}>
          <Typography variant={'h2'}>No products found</Typography>
          <Typography>Sorry, we couldn&apos;t find any products</Typography>
        </div>
      ) : (
        queryResult?.results.map((item) => <CatalogCard key={item.id} data={item} />)
      )}
    </div>
  );
}

export default CatalogCards;
