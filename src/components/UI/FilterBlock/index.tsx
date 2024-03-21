import { FormEvent, useEffect, useRef } from 'react';

import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';

import Button from '../Button';
import Checkbox from '../Checkbox';
import { Typography } from '../Typography';

import { selectProducts } from '@/app/selectors';
import {
  setSizes,
  resetSizes,
  setPrices,
  resetPrices,
  setDiscount,
  resetDiscount,
  setFilters,
} from '@/app/slices/catalog';
import { AppDispatch } from '@/app/store';
import { Status } from '@/types/types';

import s from './FilterBlock.module.scss';

const FilterBlock = ({ className = '' }: JSX.IntrinsicElements['div']) => {
  const dispatch = useDispatch<AppDispatch>();

  const { status, category } = useSelector(selectProducts);

  const ref = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    ref.current && ref.current.reset();
  }, [category]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
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

  const isDisabled = status === Status.LOADING || status === Status.ERROR;

  return (
    <form
      ref={ref}
      className={clsx(s.block, className)}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <Typography variant="h5" className={s.title}>
        Filter by
      </Typography>
      <div className={s.groups}>
        <div className={s.group}>
          <Typography variant="h6">Size</Typography>
          {sizeOptions.map(({ name, value, text }) => (
            <Checkbox
              key={value}
              className={s.input}
              name={name}
              value={value}
              text={text}
              disabled={isDisabled}
            />
          ))}
        </div>
        <div className={s.group}>
          <Typography variant="h6">Price</Typography>
          {priceOptions.map(({ name, value, text }) => (
            <Checkbox
              key={value}
              className={s.input}
              name={name}
              value={value}
              text={text}
              disabled={isDisabled}
            />
          ))}
        </div>
        <div className={s.group}>
          <Typography variant="h6">Special offers</Typography>
          <Checkbox
            className={s.input}
            name="discount"
            text="Discount only"
            disabled={isDisabled}
          />
        </div>
      </div>
      <div className={s.buttons}>
        <Button type="submit" disabled={isDisabled}>
          Apply
        </Button>
        <Button type="reset" variant="secondary" disabled={isDisabled} className={s.button}>
          Clear All
        </Button>
      </div>
    </form>
  );
};

export default FilterBlock;
