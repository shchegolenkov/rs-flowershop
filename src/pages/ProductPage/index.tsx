import { useEffect, useState } from 'react';

import { Breadcrumbs } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import AlertBlock from './AlertBlock';

import { createCart, updateCart } from '@/app/slices/cart';
import { fetchProduct } from '@/app/slices/product';
import { AppDispatch, RootState } from '@/app/store';
import Button from '@/components/UI/Button';
import ImageSlider from '@/components/UI/ImageSlider';
import ModalWindow from '@/components/UI/ModalWindow';
import { Typography } from '@/components/UI/Typography';
import NotFoundPage from '@/pages/NotFoundPage';
import {
  CategoryAttr,
  CompositionAttr,
  SizeAttr,
  Status,
  UpdateCart,
  LineItem,
} from '@/types/types';
import changeHyphenToSpace from '@/utils/changeHyphenToSpace';
import formatPrice from '@/utils/formatPrice';

import s from './ProductPage.module.scss';

const ProductPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);

  const productState = useSelector((state: RootState) => state.product);
  const { status: statusCart, cartData } = useSelector((state: RootState) => state.cart);

  const { status, product } = productState;

  const productKey = useLocation().pathname.split('/').pop() || '';

  useEffect(() => {
    dispatch(fetchProduct(productKey));
  }, [dispatch, productKey]);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleImageClick = (currentIndex: number) => {
    setCurrentIndex(currentIndex);
    setModalOpen(true);
  };

  if (status === Status.LOADING) {
    return (
      <main>
        <div className={s.loadingBlock}>
          <CircularProgress color="inherit" size={60} />
        </div>
      </main>
    );
  }

  if (!product) {
    return <NotFoundPage />;
  }
  const productId = product.id;
  const productName = product.name['en-US'];
  const productDescription = product.description['en-US'];
  const productImages = product.masterVariant.images;
  const productPrice = product.masterVariant.prices[0].value.centAmount;
  const productSalePrice = product.masterVariant.prices[0].discounted?.value.centAmount;

  const sizeAttr = product.masterVariant.attributes.find(
    (item): item is SizeAttr => item.name === 'size'
  );
  const productSize = sizeAttr?.value.key || 'no size';

  const compositionAttr = product.masterVariant.attributes.find(
    (item): item is CompositionAttr => item.name === 'composition'
  );
  const productComposition = compositionAttr?.value || 'no description';

  const categoryAttr = product.masterVariant.attributes.find(
    (item): item is CategoryAttr => item.name === 'category'
  );
  const productCategory = categoryAttr?.value || '';

  async function isHasCart() {
    if (!cartData) {
      await dispatch(createCart());
    }
  }

  async function handleCartAction(action: 'addLineItem' | 'removeLineItem') {
    await isHasCart();
    const updateData: UpdateCart = {
      action: action,
    };
    if (action === 'addLineItem') {
      updateData['productId'] = productId;
      updateData['quantity'] = 1;
    }
    if (action === 'removeLineItem' && cartData) {
      const lineItem = cartData.lineItems.find(
        (lineItem: LineItem) => lineItem.productId === productId
      );
      if (lineItem) {
        const lineItemId = lineItem.id;
        updateData['lineItemId'] = lineItemId;
      }
    }
    await dispatch(updateCart(updateData));
    setOpenAlert(true);
  }

  function isProductAddedToCart() {
    let added = false;
    if (cartData) {
      cartData.lineItems.forEach((item) => {
        if (item.productId === productId) added = true;
      });
    }
    return added;
  }

  return (
    <main>
      <div className={s.grid}>
        <div className={s.sliderBlock}>
          <ImageSlider data={productImages} imageClick={handleImageClick} />
          {productSalePrice && (
            <div className={s.saleBlock}>
              <Typography variant="h4" className={s.saleText}>
                Sale
              </Typography>
            </div>
          )}
        </div>
        <div className={s.contentBlock}>
          <div className={s.wrapper}>
            <Breadcrumbs className={s.breadcrumbs}>
              <Link to="/catalog" className={s.link}>
                <Typography variant="overline" className={s.linkText}>
                  Catalog
                </Typography>
              </Link>
              <Link to={`/catalog/${productCategory}`} className={s.link}>
                <Typography variant="overline" className={s.linkText}>
                  {changeHyphenToSpace(productCategory)}
                </Typography>
              </Link>
              <Typography variant="overline" className={s.overline}>
                {productName}
              </Typography>
            </Breadcrumbs>
            <Typography variant="h2" className={s.h2}>
              {productName}
            </Typography>
            <div className={s.priceBlock}>
              <Typography variant="h3">
                {productSalePrice ? formatPrice(productSalePrice) : formatPrice(productPrice)} €
              </Typography>
              {productSalePrice && (
                <Typography variant="h4" className={s.h4}>
                  {formatPrice(productPrice)} €
                </Typography>
              )}
            </div>
            <div className={s.descriptionBlock}>
              <div>
                <Typography variant="body" className={s.subtitle}>
                  Product description:
                </Typography>
                <Typography variant="body">{productDescription}</Typography>
              </div>
              <div>
                <Typography variant="body" className={s.subtitle}>
                  Composition:
                </Typography>
                <Typography variant="body">{productComposition}</Typography>
              </div>
              <div className={s.sizeBlock}>
                <Typography variant="body" className={s.subtitle}>
                  Size:
                </Typography>
                <Typography variant="body">{productSize}</Typography>
              </div>
            </div>
            <div className={s.btnBlock}>
              <Button
                className={s.button}
                disabled={statusCart === Status.LOADING || isProductAddedToCart()}
                onClick={() => handleCartAction('addLineItem')}
              >
                Add to cart
              </Button>
              <Button
                className={clsx(s.button, s.buttonCancel)}
                variant="underlined"
                disabled={statusCart === Status.LOADING || !isProductAddedToCart()}
                onClick={() => handleCartAction('removeLineItem')}
              >
                Remove from Cart
              </Button>
            </div>
            <div className={s.alertBlock}>
              {statusCart !== Status.LOADING && (
                <AlertBlock
                  openAlert={openAlert}
                  setOpenAlert={setOpenAlert}
                  responseStatus={statusCart}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <ModalWindow open={modalOpen} handleClose={closeModal}>
        <ImageSlider
          data={productImages}
          imageClick={handleImageClick}
          initialIndex={currentIndex}
        />
      </ModalWindow>
    </main>
  );
};

export default ProductPage;
