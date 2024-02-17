import { useSelector, useDispatch } from 'react-redux';

import RadioButton from '../RadioButton';
import { Typography } from '../Typography';

import { setSort } from '@/app/slices/catalog';
import { RootState, AppDispatch } from '@/app/store';
import { Status } from '@/types/types';

import s from './SortingBlock.module.scss';

const FilterBlock = ({ className }: JSX.IntrinsicElements['div']) => {
  const { sort, status } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();

  function handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSort(e.target.value));
  }

  const sortOptions = [
    { name: 'Default', value: '', id: 'default_option' },
    { name: 'Price (low to high)', value: 'price asc', id: 'price_asc' },
    { name: 'Price (high to low)', value: 'price desc', id: 'price_desc' },
    { name: 'Name (A to Z)', value: 'name.en-US asc', id: 'name_asc' },
    { name: 'Name (Z to A)', value: 'name.en-US desc', id: 'name_desc' },
  ];

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
