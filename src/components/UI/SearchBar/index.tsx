import { useState, useEffect, useRef } from 'react';

import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import { setQuery } from '../../../app/slices/catalog';
import { AppDispatch, RootState } from '../../../app/store';
import Button from '../Button';

import s from './SearchBar.module.scss';

function SearchBar({ className }: JSX.IntrinsicElements['form']) {
  const [isText, setIsText] = useState(false);
  const { query, category } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();

  const ref = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    ref.current && ref.current.reset();
  }, [category]);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    dispatch(setQuery(target.search.value));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
      onSubmit={(e) => handleSubmit(e)}
      onReset={handleReset}
    >
      <div className={s.borders}>
        <input
          type="text"
          placeholder="Search"
          name="search"
          className={s.input}
          onChange={(e) => handleChange(e)}
          autoComplete="off"
        />
        {isText && <button type="reset" className={s.reset}></button>}
      </div>
      <Button type={'submit'}>Search</Button>
    </form>
  );
}

export default SearchBar;
