import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { setQuery } from '../../../app/slices/catalog';
import Button from '../Button';
import s from './SearchBar.module.scss';
import { useState } from 'react';

function SearchBar({ className }: JSX.IntrinsicElements['form']) {
  const [isText, setIsText] = useState(false);
  const { query } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();

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
      className={clsx(s.form, className)}
      onSubmit={(e) => handleSubmit(e)}
      onReset={handleReset}
    >
      <input
        type="text"
        placeholder="Search"
        name="search"
        className={s.input}
        onChange={(e) => handleChange(e)}
        autoComplete="off"
      ></input>
      {isText && <button type="reset" className={s.reset}></button>}
      <Button type={'submit'}>Search</Button>
    </form>
  );
}

export default SearchBar;
