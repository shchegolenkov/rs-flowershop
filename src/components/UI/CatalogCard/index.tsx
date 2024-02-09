import { useEffect, useState, useCallback } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { createCart, updateCart } from '../../../app/slices/cart';
import { AppDispatch, RootState } from '../../../app/store';
import { IProduct, SizeAttr, Status, UpdateCart } from '../../../types/types';
import formatPrice from '../../../utils/formatPrice';
import Button from '../Button';
import { Typography } from '../Typography';

import CartBtnIco from '../../../assets/svg/cartBtnIco.svg';
import productLabel from '../../../assets/svg/dummy.svg?url';

import s from './CatalogCard.module.scss';

interface ICatalogCard {
  data: IProduct;
}

function CatalogCard({ data }: ICatalogCard) {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.cart);
  const [localStatus, setLocalStatus] = useState(Status.SUCCESS);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
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

  const handleCartBtnClick = async () => {
    try {
      setLocalStatus(Status.LOADING);
      if (!localStorage.getItem('cart')) {
        await dispatch(createCart());
      }
      const updateData: UpdateCart = {
        action: 'addLineItem',
        productId: data.id,
        quantity: 1,
      };
      await dispatch(updateCart(updateData));
      setIsButtonDisabled(isDisable());
      setLocalStatus(Status.SUCCESS);
    } catch (error) {
      console.log('Error create cart or added product to cart:', error);
    }
  };

  const isDisable = useCallback(() => {
    const cartData = localStorage.getItem('cart') || null;
    const cart = cartData ? JSON.parse(cartData) : '';
    if (cart && cart.lineItems && Array.isArray(cart.lineItems)) {
      for (const lineItem of cart.lineItems) {
        if (lineItem.productId === data.id) {
          return true;
        }
      }
    }
    return false;
  }, [data.id]);
  useEffect(() => {
    setIsButtonDisabled(isDisable());
  }, [isDisable]);
  return (
    <div className={s.card}>
      <Link to={`${productUrl}`} className={s.link} style={{ backgroundImage: `url(${imgUrl})` }}>
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
      </Link>
      {localStatus === Status.LOADING ? (
        <div className={s.loadBlock}>
          <CircularProgress color={'inherit'} size={26} />
        </div>
      ) : (
        <Button
          className={s.btn}
          variant={'ico'}
          onClick={handleCartBtnClick}
          disabled={status === Status.LOADING ? true : isButtonDisabled}
        >
          <CartBtnIco />
        </Button>
      )}
    </div>
  );
}

export default CatalogCard;
