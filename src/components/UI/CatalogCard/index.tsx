import { IProduct } from '../../../types/types';
import { Typography } from '../Typography';
import s from './CatalogCard.module.scss';

interface ICatalogCard {
  data: IProduct;
}

function formatPrice(price: number): string {
  return `${price}`.slice(0, -2) + '.' + `${price}`.slice(-2);
}

function CatalogCard({ data }: ICatalogCard) {
  const imgUrl = data.masterVariant.images[0].url;
  const responseDescription = data.masterVariant.attributes.filter(
    (item: { name: string }) => item.name === 'composition'
  )[0];
  const description = responseDescription || 'description';
  const size = data.masterVariant.attributes.filter(
    (item: { name: string }) => item.name === 'size'
  )[0].value.key;
  const price = data.masterVariant.prices[0].value.centAmount;
  const discountPrice = data.masterVariant.prices[0].discounted?.value.centAmount;
  return (
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
  );
}

export default CatalogCard;
