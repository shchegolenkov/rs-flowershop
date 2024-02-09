import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { RootState } from '../../../app/store';
import { ITEMS_PER_PAGE } from '../../../constants/const';
import { Status } from '../../../types/types';
import CatalogCard from '../CatalogCard';
import { Skeleton } from '../CatalogCard/Skeleton';
import { Typography } from '../Typography';

import s from './CatalogCards.module.scss';

function CatalogCards({ className }: JSX.IntrinsicElements['div']) {
  const { status, queryResult } = useSelector((state: RootState) => state.products);
  const skeletons = [...new Array(ITEMS_PER_PAGE)].map((_, index) => <Skeleton key={index} />);
  return (
    <div className={clsx(s.wrapper, className)}>
      {status === Status.LOADING ? (
        skeletons
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
