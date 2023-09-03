import s from './FilterBlock.module.scss';
import { Typography } from '../Typography';
import RadioButton from '../RadioButton';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../app/store';
import { setSort } from '../../../app/slices/catalog';
import { Status } from '../../../types/types';

function FilterBlock({ className }: JSX.IntrinsicElements['div']) {
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
      <Typography variant={'h5'}>Sorting by</Typography>
      <ul className={s.group}>
        {sortOptions.map(({ id, name, value }) => (
          <li key={id} className={s.radio}>
            <RadioButton
              name={name}
              value={value}
              id={'default_option'}
              checked={sort === value}
              onChange={handleChangeValue}
              disabled={status === Status.LOADING || status === Status.ERROR}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterBlock;
