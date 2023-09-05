import { useState } from 'react';
import clsx from 'clsx';
import s from './ImageSlider.module.scss';
import ArrowIco from '../../../assets/svg/arrowSlideRight.svg';
import ArrowPageIco from '../../../assets/svg/arrowSlidePageRight.svg';
import { ProductImage } from '../../../types/types';

interface IImageSlider {
  data: ProductImage[];
  className?: string | undefined;
}

function ImageSlider({ data, className }: IImageSlider) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? data.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === data.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return data.length === 1 ? (
    <div className={clsx(s.slider, className)}>
      <div className={s.single_image_wrapper}>
        <div style={{ backgroundImage: `url(${data[0].url})` }} className={s.image_block}></div>
      </div>
    </div>
  ) : (
    <div className={clsx(s.slider, className)}>
      <div className={s.image_wrapper}>
        <button className={clsx(s.image_button, s.image_button_left)} onClick={prevSlide}>
          <ArrowIco />
        </button>
        <div
          style={{ backgroundImage: `url(${data[currentIndex].url})` }}
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
        {data.map((slide, slideIndex) => (
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
