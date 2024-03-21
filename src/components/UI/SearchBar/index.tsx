import { useState, useEffect, useRef, SyntheticEvent, ChangeEvent } from 'react';

import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button';

import { selectProducts } from '@/app/selectors';
import { setQuery } from '@/app/slices/catalog';
import { AppDispatch } from '@/app/store';

import s from './SearchBar.module.scss';

const SearchBar = ({ className = '' }: JSX.IntrinsicElements['form']) => {
  const [isText, setIsText] = useState(false);
  const { query, category } = useSelector(selectProducts);
  const dispatch = useDispatch<AppDispatch>();

  const ref = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    ref.current && ref.current.reset();
  }, [category]);

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    dispatch(setQuery(target.search.value));
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > 0) {
      setIsText(true);
    } else {
      setIsText(false);
      dispatch(setQuery(''));
    }
  }

  function handleReset() {
    if (query !== '') dispatch(setQuery(''));
    setIsText(false);
  }

  return (
    <form
      ref={ref}
      className={clsx(s.form, className)}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <div className={s.borders}>
        <input
          type="text"
          placeholder="Search"
          name="search"
          className={s.input}
          onChange={handleChange}
          autoComplete="off"
        />
        {isText && <button type="reset" className={s.reset} />}
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchBar;
