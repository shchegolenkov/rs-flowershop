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
  const [currentIndex] = useState(0);

  return (
    <div className={clsx(s.slider, className)}>
      <div
        style={{ backgroundImage: `url(${data.images[currentIndex].url})` }}
        className={s.slider__image_block}
      ></div>
    </div>
  );
}

export default ImageSlider;
