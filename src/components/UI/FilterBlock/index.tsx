import clsx from 'clsx';
import s from './FilterBlock.module.scss';
import { Typography } from '../Typography';
import Checkbox from '../Checkbox';
import Button from '../Button';
import { Status } from '../../../types/types';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSizes,
  resetSizes,
  setPrices,
  resetPrices,
  setDiscount,
  resetDiscount,
  setFilters,
} from '../../../app/slices/catalog';
import { RootState, AppDispatch } from '../../../app/store';
import { useEffect, useRef } from 'react';

function FilterBlock({ className }: JSX.IntrinsicElements['div']) {
  const { status, category } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();

  const ref = useRef(null);

  useEffect(() => {
    ref && ref.current.reset();
  }, [category]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const filterSizes: string[] = [];
    const filterPrices: string[] = [];
    let isDiscount = false;
    for (const [name, value] of formData.entries()) {
      switch (name) {
        case 'size':
          filterSizes.push(`"${value}"`);
          break;
        case 'price':
          filterPrices.push(`${value}`);
          break;
        case 'discount':
          isDiscount = true;
          break;
      }
    }
    filterSizes.length > 0
      ? dispatch(setSizes(`key:${filterSizes.join(',')}`))
      : dispatch(resetSizes());
    filterPrices.length > 0
      ? dispatch(setPrices(`${filterPrices.join(',')}`))
      : dispatch(resetPrices());
    isDiscount ? dispatch(setDiscount()) : dispatch(resetDiscount());
    dispatch(setFilters());
  }

  function handleReset() {
    dispatch(resetSizes());
    dispatch(resetPrices());
    dispatch(resetDiscount());
    dispatch(setFilters());
  }

  const sizeOptions = [
    { name: 'size', value: 'S', text: 'Small' },
    { name: 'size', value: 'M', text: 'Medium' },
    { name: 'size', value: 'L', text: 'Large' },
  ];

  const priceOptions = [
    { name: 'price', value: '(* to 3000)', text: 'Up to 30 €' },
    { name: 'price', value: '(* to 5000)', text: 'Up to 50 €' },
    { name: 'price', value: '(* to 10000)', text: 'Up to 100 €' },
    { name: 'price', value: '(10001 to *)', text: 'From 100 €' },
  ];

  return (
    <form
      ref={ref}
      className={clsx(s.block, className)}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <Typography variant={'h5'} className={s.title}>
        Filter by
      </Typography>
      <div className={s.group}>
        <Typography variant={'h6'}>Size</Typography>
        {sizeOptions.map(({ name, value, text }) => (
          <Checkbox
            key={value}
            className={s.input}
            name={name}
            value={value}
            text={text}
            disabled={status === Status.LOADING || status === Status.ERROR}
          />
        ))}
      </div>
      <div className={s.group}>
        <Typography variant={'h6'}>Price</Typography>
        {priceOptions.map(({ name, value, text }) => (
          <Checkbox
            key={value}
            className={s.input}
            name={name}
            value={value}
            text={text}
            disabled={status === Status.LOADING || status === Status.ERROR}
          />
        ))}
      </div>
      <div className={s.group}>
        <Typography variant={'h6'}>Special offers</Typography>
        <Checkbox
          className={s.input}
          name={'discount'}
          text={'Discount only'}
          disabled={status === Status.LOADING || status === Status.ERROR}
        />
      </div>
      <Button type={'submit'} disabled={status === Status.LOADING || status === Status.ERROR}>
        Apply
      </Button>
      <Button
        type={'reset'}
        variant={'secondary'}
        disabled={status === Status.LOADING || status === Status.ERROR}
        className={s.button}
      >
        Clear All
      </Button>
    </form>
  );
}

export default FilterBlock;
