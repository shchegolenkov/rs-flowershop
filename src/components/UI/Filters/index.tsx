import clsx from 'clsx';
import SortingBlock from '../SortingBlock';
import s from './Filters.module.scss';

function Filters({ className }: JSX.IntrinsicElements['div']) {
  return (
    <div className={clsx(s.block, className)}>
      <SortingBlock />
    </div>
  );
}

export default Filters;
