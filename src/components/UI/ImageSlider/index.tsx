import { useState } from 'react';
import clsx from 'clsx';
import s from './ImageSlider.module.scss';
import ArrowIco from '../../../assets/svg/arrowSlideRight.svg';
import ArrowPageIco from '../../../assets/svg/arrowSlidePageRight.svg';

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

  return data.images.length === 1 ? (
    <div className={clsx(s.slider, className)}>
      <div className={s.single_image_wrapper}>
        <div
          style={{ backgroundImage: `url(${data.images[0].url})` }}
          className={s.image_block}
        ></div>
      </div>
    </div>
  ) : (
    <div className={clsx(s.slider, className)}>
      <div className={s.image_wrapper}>
        <button className={clsx(s.image_button, s.image_button_left)} onClick={prevSlide}>
          <ArrowIco />
        </button>
        <div
          style={{ backgroundImage: `url(${data.images[currentIndex].url})` }}
          className={s.image_block}
        ></div>
        <button className={clsx(s.image_button, s.image_button_right)} onClick={nextSlide}>
          <ArrowIco />
        </button>
      </div>
      <div className={s.buttons_panel}>
        <button className={clsx(s.button, s.button_left)} onClick={prevSlide}>
          <ArrowPageIco />
        </button>
        {data.images.map((slide, slideIndex) => (
          <button
            key={slide.url}
            onClick={() => goToSlide(slideIndex)}
            className={clsx(s.button, s.button_num, {
              [s.button_num_active]: slideIndex === currentIndex,
            })}
          >
            {slideIndex + 1}
          </button>
        ))}
        <button className={s.button} onClick={nextSlide}>
          <ArrowPageIco />
        </button>
      </div>
    </div>
  );
}

export default ImageSlider;
