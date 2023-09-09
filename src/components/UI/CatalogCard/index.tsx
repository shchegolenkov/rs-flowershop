import { IProduct, SizeAttr } from '../../../types/types';
import { Typography } from '../Typography';
import productLabel from '../../../assets/svg/dummy.svg?url';
import s from './CatalogCard.module.scss';
import { Link } from 'react-router-dom';
import formatPrice from '../../../utils/formatPrice';

interface ICatalogCard {
  data: IProduct;
}

function CatalogCard({ data }: ICatalogCard) {
  const productUrl = data.slug['en-US'];
  const responceImg = data.masterVariant.images;
  const imgUrl = responceImg.length > 0 ? responceImg[0].url : productLabel;
  const description =
    data.masterVariant.attributes.filter(
      (item: { name: string }) => item.name === 'composition'
    )[0] || 'no description';
  const sizeAttr = data.masterVariant.attributes.find(
    (item): item is SizeAttr => item.name === 'size'
  );
  const size = sizeAttr ? sizeAttr.value.key : 'no size';
  const price = data.masterVariant.prices[0].value.centAmount;
  const discountPrice = data.masterVariant.prices[0].discounted?.value.centAmount;
  return (
    <Link to={`${productUrl}`} className={s.link}>
      <div className={s.card} style={{ backgroundImage: `url(${imgUrl})` }}>
        {discountPrice && (
          <Typography variant={'h4'} className={s.sale}>
            SALE
          </Typography>
        )}
        <div className={s.description}>
          <Typography variant={'h5'}>{data.name['en-US']}</Typography>
          <Typography variant={'caption'} className={s.caption} as={'span'}>
            {`${description.value} `}
            {`Size: ${size}`}
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
