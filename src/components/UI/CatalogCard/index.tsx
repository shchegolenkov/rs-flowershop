import { IProduct } from '../../../types/types';
import { Typography } from '../Typography';
import productLabel from '../../../assets/svg/dummy.svg?url';
import s from './CatalogCard.module.scss';
import { Link } from 'react-router-dom';

interface ICatalogCard {
  data: IProduct;
}

function formatPrice(price: number): string {
  return `${price}`.slice(0, -2) + '.' + `${price}`.slice(-2);
}

function CatalogCard({ data }: ICatalogCard) {
  const id = data.id;
  const responceImg = data.masterVariant.images;
  const imgUrl = responceImg.length > 0 ? responceImg[0].url : productLabel;
  const description =
    data.masterVariant.attributes.filter(
      (item: { name: string }) => item.name === 'composition'
    )[0] || 'no description';
  const size = data.masterVariant.attributes.filter(
    (item: { name: string }) => item.name === 'size'
  )[0].value.key;
  const price = data.masterVariant.prices[0].value.centAmount;
  const discountPrice = data.masterVariant.prices[0].discounted?.value.centAmount;
  return (
    <Link to={`/${id}`} className={s.link}>
      <div className={s.card} style={{ backgroundImage: `url(${imgUrl})` }}>
        {discountPrice && (
          <Typography variant={'h4'} className={s.sale}>
            SALE
          </Typography>
        )}
        <div className={s.description}>
          <Typography variant={'h5'}>{data.name['en-US']}</Typography>
          <Typography variant={'caption'} className={s.caption}>
            {`${description.value} Size: ${size}`}
          </Typography>
          <div className={s.prices}>
            {discountPrice ? (
              <>
                <Typography variant={'h5'}>{formatPrice(discountPrice)} €</Typography>
                <Typography variant={'h6'} className={s.oldPrice}>
                  {formatPrice(price)} €
                </Typography>
              </>
            ) : (
              <Typography variant={'h5'}>{formatPrice(price)} €</Typography>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CatalogCard;
