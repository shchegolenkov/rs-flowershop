import s from './Counter.module.scss';

interface Counter {
  value: number;
  handleDecrease: () => void;
  handleIncrease: () => void;
  min?: number;
  max?: number;
}

const Counter = ({ value, handleDecrease, handleIncrease, min = 1, max = 99 }: Counter) => {
  return (
    <div className={s.counterBlock}>
      <button className={s.button} disabled={value === min} onClick={handleDecrease}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="2"
          viewBox="0 0 20 2"
          fill="none"
        >
          <path d="M19.5 1.5H0.5V0.5H19.5V1.5Z" fill="#121212" />
        </svg>
      </button>
      <span className={s.counter}>{value}</span>
      <button className={s.button} onClick={handleIncrease} disabled={value === max}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path d="M19.5 10.5H0.5V9.5H19.5V10.5Z" fill="#121212" />
          <path d="M10.5 0.5V19.5H9.5V0.5H10.5Z" fill="#121212" />
        </svg>
      </button>
    </div>
  );
};

export default Counter;
