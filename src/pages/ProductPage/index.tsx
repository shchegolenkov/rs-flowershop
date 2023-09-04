import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchProduct } from '../../app/slices/product';
import { Breadcrumbs } from '@mui/material';
import { Typography } from '../../components/UI/Typography';
import Button from '../../components/UI/Button';
import ImageSlider from '../../components/UI/ImageSlider';
import s from './ProductPage.module.scss';
import { Status } from '../../types/types';
import formatPrice from '../../utils/formatPrice';
import NotFoundPage from '../../pages/NotFoundPage';
import CircularProgress from '@mui/material/CircularProgress';

function changeHyphenToSpace(input: string): string {
  return input.replace(/-/g, ' ');
}

function ProductPage() {
  const productKey = useLocation().pathname.split('/').pop() || '';

  const productState = useSelector((state: RootState) => state.product);
  const { status, product } = productState;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProduct(productKey));
  }, [dispatch, productKey]);

  if (status === Status.LOADING) {
    return (
      <main>
        <div className={s.loadingBlock}>
          <CircularProgress color={'inherit'} size={60} />
        </div>
      </main>
    );
  }

  if (!product) {
    return <NotFoundPage />;
  }

  const productName = product.name['en-US'];
  const productDescription = product.description['en-US'];
  const productImages = product.masterVariant.images;
  const productPrice = product.masterVariant.prices[0].value.centAmount;
  const productSalePrice = product.masterVariant.prices[0].discounted?.value.centAmount;

  const sizeAttribute = product.masterVariant.attributes.find(
    (item: { name: string }) => item.name === 'size'
  );
  const productSize = sizeAttribute?.value.key || 'no size';

  const compositionAttr = product.masterVariant.attributes.find(
    (item: { name: string }) => item.name === 'composition'
  );
  const productComposition = compositionAttr ? compositionAttr.value : 'no description';

  const categoryAttr = product.masterVariant.attributes.find(
    (item: { name: string }) => item.name === 'category'
  );
  const productCategory = categoryAttr ? categoryAttr.value : '';

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
              <Link to={`/catalog/${productCategory}`} className={s.link}>
                <Typography variant={'overline'} className={s.linkText}>
                  {changeHyphenToSpace(productCategory)}
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
