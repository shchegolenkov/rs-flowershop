import { useState } from 'react';
import clsx from 'clsx';
import s from './ImageSlider.module.scss';

const data = {
  images: [
    {
      url: 'https://uploads-ssl.webflow.com/6400d82951450087c6d1eba8/64342f2f697cd6f26e2dd109_63c1bf6aff3ea3891a353fbf_championnet-en.webp',
    },
    {
      url: 'https://uploads-ssl.webflow.com/6400d82951450087c6d1eba8/64342f2f697cd676fd2dd105_63c1bf78d8a7a858df672d66_championnet-en%25202.webp',
    },
    {
      url: 'https://uploads-ssl.webflow.com/6400d82951450087c6d1eba8/64342f2f697cd617be2dd106_63c1bf721764ef7c2d3ded39_championnet-en%25204.webp',
    },
  ],
};

interface IImageSlider {
  className?: string | undefined;
}

function ImageSlider({ className }: IImageSlider) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? data.images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === data.images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className={clsx(s.slider, className)}>
      <div
        style={{ backgroundImage: `url(${data.images[currentIndex].url})` }}
        className={s.image_block}
      ></div>
      <div className={s.buttons_panel}>
        <button className={s.button} onClick={prevSlide}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15.41 16.58L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.58Z"
              fill="#121212"
            />
          </svg>
        </button>
        {data.images.map((slide, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={clsx(s.button, s.button_num, {
              [s.button_num_active]: slideIndex === currentIndex,
            })}
          >
            {slideIndex + 1}
          </button>
        ))}
        <button className={s.button} onClick={nextSlide}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M8.58984 16.58L13.1698 12L8.58984 7.41L9.99984 6L15.9998 12L9.99984 18L8.58984 16.58Z"
              fill="#121212"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ImageSlider;
