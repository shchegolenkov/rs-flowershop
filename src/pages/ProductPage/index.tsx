import { Link, useLocation } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';
import { Typography } from '../../components/UI/Typography';
import Button from '../../components/UI/Button';
import ImageSlider from '../../components/UI/ImageSlider';
import s from './ProductPage.module.scss';
import { IProduct } from '../../types/types';
import formatPrice from '../../utils/formatPrice';

const data: IProduct = {
  id: 'e8a186c9-18e2-44ee-815e-766c0b8b2979',
  version: 7,
  productType: {
    typeId: 'product-type',
    id: '17e45e7b-c31b-4e12-8d87-257428f80a35',
  },
  name: {
    'en-US': 'Retro',
  },
  description: {
    'en-US':
      "With its unique blend of zesty citrus notes, it embraces the nostalgia of yesteryears while infusing a refreshing ambiance. Handcrafted with love, this candle brings a burst of energy and brightness to your living space, creating a vibrant and uplifting atmosphere. It's perfect for those seeking a touch of retro-inspired elegance with a twist of invigorating citrus scent.",
  },
  categories: [
    {
      typeId: 'category',
      id: 'b1898ea3-45ea-4306-ad02-3914c1e38610',
    },
  ],
  categoryOrderHints: {},
  slug: {
    'en-US': 'retro',
  },
  metaTitle: {
    'en-US': '',
  },
  metaDescription: {
    'en-US': '',
  },
  masterVariant: {
    id: 1,
    sku: 'CANDLES-7',
    prices: [
      {
        id: '2c7eb0fb-de5e-45b5-a4da-229f7e854ef2',
        value: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 6000,
          fractionDigits: 2,
        },
      },
    ],
    images: [
      {
        url: 'https://6da2d6c12926a189be0a-a0577ba5039c5fc7fd563c06d21084b6.ssl.cf3.rackcdn.com/Retro-EUwdQ1_B.jpg',
        label: '1',
        dimensions: {
          w: 2560,
          h: 3840,
        },
      },
    ],
    attributes: [
      {
        name: 'composition',
        value: 'Citrus.',
      },
      {
        name: 'discount',
        value: false,
      },
      {
        name: 'size',
        value: {
          key: 'L',
          label: 'L',
        },
      },
    ],
    assets: [],
  },
  variants: [],
  searchKeywords: {},
  hasStagedChanges: false,
  published: true,
  key: 'retro',
  taxCategory: {
    typeId: 'tax-category',
    id: '7f2becc7-a1fd-4fde-92e0-9ba4a7af623f',
  },
  priceMode: 'Embedded',
  createdAt: '2023-08-30T09:10:42.846Z',
  lastModifiedAt: '2023-09-03T17:25:07.710Z',
};

function ProductPage() {
  const productKey = useLocation().pathname.split('/').pop();
  console.log(productKey);

  const productName = data.name['en-US'];
  const productDescription = data.description['en-US'];
  const productImages = data.masterVariant.images;
  const productPrice = data.masterVariant.prices[0].value.centAmount;
  const productSalePrice = data.masterVariant.prices[0].discounted?.value.centAmount;

  const sizeAttribute = data.masterVariant.attributes.find(
    (item: { name: string }) => item.name === 'size'
  );
  const productSize = sizeAttribute?.value.key || 'no size';

  const compositionAttr = data.masterVariant.attributes.find(
    (item: { name: string }) => item.name === 'composition'
  );
  const productComposition = compositionAttr ? compositionAttr.value : 'no description';

  return (
    <main>
      <div className={s.grid}>
        <div className={s.sliderBlock}>
          <ImageSlider data={productImages} />
          {productSalePrice && (
            <div className={s.saleBlock}>
              <Typography variant={'h4'} className={s.saleText}>
                Sale
              </Typography>
            </div>
          )}
        </div>
        <div className={s.contentBlock}>
          <div className={s.wrapper}>
            <Breadcrumbs className={s.breadcrumbs}>
              <Link to={'/catalog'} className={s.link}>
                <Typography variant={'overline'} className={s.linkText}>
                  Catalog
                </Typography>
              </Link>
              <Link to={'/catalog/fresh-flowers'} className={s.link}>
                <Typography variant={'overline'} className={s.linkText}>
                  Fresh flowers
                </Typography>
              </Link>
              <Typography variant={'overline'} className={s.overline}>
                {productName}
              </Typography>
            </Breadcrumbs>
            <Typography variant={'h2'} className={s.h2}>
              {productName}
            </Typography>
            <div className={s.priceBlock}>
              <Typography variant={'h3'}>
                {productSalePrice ? formatPrice(productSalePrice) : formatPrice(productPrice)} €
              </Typography>
              {productSalePrice && (
                <Typography variant={'h4'} className={s.h4}>
                  {formatPrice(productPrice)} €
                </Typography>
              )}
            </div>
            <div className={s.descriptionBlock}>
              <div>
                <Typography variant={'body'} className={s.subtitle}>
                  Product description:
                </Typography>
                <Typography variant={'body'}>{productDescription}</Typography>
              </div>
              <div>
                <Typography variant={'body'} className={s.subtitle}>
                  Composition:
                </Typography>
                <Typography variant={'body'}>{productComposition}</Typography>
              </div>
              <div className={s.sizeBlock}>
                <Typography variant={'body'} className={s.subtitle}>
                  Size:
                </Typography>
                <Typography variant={'body'}>{productSize}</Typography>
              </div>
            </div>
            <Button className={s.button}>Add to cart</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;
