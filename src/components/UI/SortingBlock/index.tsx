import { ChangeEvent } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import RadioButton from '../RadioButton';
import { Typography } from '../Typography';

import { sortOptions } from './const';

import { selectProducts } from '@/app/selectors';
import { setSort } from '@/app/slices/catalog';
import { AppDispatch } from '@/app/store';
import { Status } from '@/types/types';

import s from './SortingBlock.module.scss';

const FilterBlock = ({ className = '' }: JSX.IntrinsicElements['div']) => {
  const { sort, status } = useSelector(selectProducts);

  const dispatch = useDispatch<AppDispatch>();

  function handleChangeValue(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setSort(e.target.value));
  }

  return (
    <div className={className}>
      <Typography variant="h5">Sorting by</Typography>
      <div className={s.group}>
        {sortOptions.map(({ id, name, value }) => (
          <RadioButton
            key={id}
            className={s.radio}
            name={name}
            value={value}
            checked={sort === value}
            onChange={handleChangeValue}
            disabled={status === Status.LOADING || status === Status.ERROR}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterBlock;
