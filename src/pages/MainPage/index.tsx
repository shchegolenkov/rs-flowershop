import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/UI/Button';
import MainPageLink from '@/components/UI/MainPageLink';
import { Typography } from '@/components/UI/Typography';

import s from './MainPage.module.scss';

const links = [
  { to: '/catalog', title: 'All products' },
  { to: '/catalog/fresh-flowers', title: 'Fresh flowers' },
  { to: '/catalog/dried-flowers', title: 'Dried flowers' },
  { to: '/catalog/live-plants', title: 'Live plants' },
  { to: '/catalog/candles', title: 'Aroma candles' },
  { to: '/catalog/fresheners', title: 'Fresheners' },
];

function MainPage() {
  const navigate = useNavigate();
  return (
    <main>
      <div className={s.grid}>
        <div className={s.left}>
          <section className={s.sticky}>
            <div className={clsx(s.wrapper, s.startBlock)}>
              <Typography variant={'h1'}>Rolling Scopes Flowers</Typography>
              <Typography variant={'subtitle'}>
                Experience exquisitely curated bouquets and gifts for every occasion: spread joy
                with the convenience of our online flower delivery service.
              </Typography>
            </div>
            <div className={clsx(s.wrapper, s.startBlock, s.promo)}>
              <Typography variant={'h4'} className={s.promotitle}>
                Get 10% off your first order with promo code
              </Typography>
              <Typography variant={'h2'}>WELCOME</Typography>
            </div>
          </section>
        </div>
        <div className={s.right}>
          {links.map((link) => (
            <MainPageLink key={link.title} to={link.to} title={link.title} />
          ))}
        </div>
      </div>
      <div className={s.grid}>
        <div className={s.left}>
          <section className={clsx(s.wrapper, s.sticky, s.about)}>
            <Typography variant={'h2'}>About us</Typography>
          </section>
        </div>
        <div className={clsx(s.right, s.wrapper)}>
          <section>
            <Typography variant={'overline'} className={s.overline}>
              our story
            </Typography>
            <Typography variant={'h3'} className={s.aboutHeader}>
              Rolling Scopes Flowers
            </Typography>
            <Typography>
              We are a modern local floral studio, which specializes in the design and delivery of
              unique bouquets. We have the best florists who carefully select each look, our studio
              cooperates directly with farms for growing different flowers, so we always have fresh
              flowers, which are collected by our florists in exquisite bouquets. We have a
              collection of fresh bouquets, collections of dried bouquets, house plants, as well as
              fragrant candles from luxury brands to create the perfect atmosphere. Make
              someone&apos;s day amazing by sending flowers, plants and gifts the same or next day.
              Ordering flowers online has never been easier.
            </Typography>
            <Button
              className={s.button}
              variant="secondary"
              onClick={() => {
                const path = 'about';
                navigate(path);
              }}
            >
              Learn more
            </Button>
          </section>
        </div>
      </div>
      <section className={s.quote}>
        <Typography variant="overline">Inspiration</Typography>
        <Typography variant="h2">
          Elevate Moments, Embrace Nature: Where Bouquets Blossom into Memories
        </Typography>
      </section>
    </main>
  );
}

export default MainPage;
