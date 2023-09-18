import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { applyPromo, resetPromo, setPromoStatus } from '../../app/slices/cart';
import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import ErrorIcon from '@mui/icons-material/Error';
import FormTheme from '../../themes/FormTheme';
import Button from '../../components/UI/Button';
import CartCard from '../../components/UI/CartCard';
import { Typography } from '../../components/UI/Typography';
import ClearCartIco from '../../assets/svg/delCart.svg';
import ClearCart from './ClearCart/';
import { Status, WelcomeCodes } from '../../types/types';
import formatPrice from '../../utils/formatPrice';
import s from './CartPage.module.scss';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { cartData, promoStatus } = useSelector((state: RootState) => state.cart);
  const cartItems = cartData?.lineItems || null;

  const [openClearCart, setOpenClearCart] = useState(false);

  const { status: statusCart } = useSelector((state: RootState) => state.cart);

  const handleBtnClearCartClick = () => {
    setOpenClearCart(!openClearCart);
  };

  const [inputValue, setInputValue] = useState(
    cartData?.discountCodes[0]?.discountCode.id === WelcomeCodes.WELCOME ? 'welcome' : ''
  );

  const subTotal = cartData?.lineItems.reduce(
    (acc, item) =>
      (acc += item.variant.prices[0].discounted
        ? item.variant.prices[0].discounted.value.centAmount * item.quantity
        : item.variant.prices[0].value.centAmount * item.quantity),
    0
  );

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      promo: { value: string };
    };
    if (target.promo.value.length === 0) return;
    const updateData = { action: 'addDiscountCode', code: target.promo.value.toLowerCase() };
    dispatch(applyPromo(updateData));
  };

  const handleReset = () => {
    promoStatus === Status.SUCCESS && dispatch(resetPromo());
    setInputValue('');
    dispatch(setPromoStatus(Status.LOADING));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.length === 0 && promoStatus === Status.SUCCESS) {
      dispatch(resetPromo());
    } else if (e.target.value.length === 0) {
      dispatch(setPromoStatus(Status.LOADING));
    }
  };

  const location = useLocation();

  useEffect(() => {
    if (promoStatus === Status.ERROR) dispatch(setPromoStatus(Status.LOADING));
  }, [location]);

  useEffect(() => {
    if ((cartItems?.length === 0 || !cartItems) && promoStatus === Status.ERROR) {
      setInputValue('');
      dispatch(setPromoStatus(Status.LOADING));
    }
  }, [cartItems]);

  return (
    <main>
      <div className={s.grid}>
        <div className={s.imageWrapper}>
          <div className={s.imageBlock}></div>
        </div>
        <div className={s.content}>
          <div className={s.wrapper}>
            <Typography variant={'overline'} className={s.overline}>
              Order summary
            </Typography>
            {cartItems?.length ? (
              <div className={s.itemsBlock}>
                <button
                  className={s.buttonClear}
                  onClick={handleBtnClearCartClick}
                  disabled={statusCart === Status.LOADING}
                >
                  <Typography variant={'subtitle'}>Clear all cart</Typography>
                  <ClearCartIco />
                </button>
                <div>
                  {cartItems.map((item) => (
                    <CartCard key={item.id} data={item} />
                  ))}
                </div>
              </div>
            ) : (
              <div className={s.emptyCartBlock}>
                <Typography variant={'h2'} className={s.h2}>
                  Your cart is&nbsp;empty
                </Typography>
                <Typography>
                  Looks like you haven`t added anything to&nbsp;your&nbsp;cart&nbsp;yet
                </Typography>
                <Button
                  className={s.buttonCatalog}
                  onClick={() => {
                    const path = '/catalog';
                    navigate(path);
                  }}
                >
                  Start shopping
                </Button>
              </div>
            )}
            <div className={s.promoBlock}>
              <Typography variant={'body'}>
                If you have our promo code, enter the&nbsp;code to&nbsp;get&nbsp;discount
              </Typography>
              <ThemeProvider theme={FormTheme}>
                <form
                  className={clsx(s.promoForm, [
                    promoStatus === Status.SUCCESS && s.promoFormSuccess,
                  ])}
                  onSubmit={handleSubmit}
                  onReset={handleReset}
                >
                  <TextField
                    value={inputValue}
                    label={'Promo code'}
                    id={'promocode-input'}
                    className={s.textInput}
                    disabled={
                      !cartItems ||
                      promoStatus === Status.SUCCESS ||
                      statusCart === Status.LOADING ||
                      cartItems.length === 0
                    }
                    name="promo"
                    error={promoStatus === Status.ERROR}
                    helperText={
                      promoStatus === Status.ERROR ? (
                        <span className={clsx(s.errMessage, s.errMessageActive)}>
                          <ErrorIcon color="error" /> {'Enter valid promo code'}
                        </span>
                      ) : (
                        <span className={s.errMessage}></span>
                      )
                    }
                    onChange={handleChange}
                  />
                  {promoStatus !== Status.SUCCESS ? (
                    <Button
                      type="submit"
                      variant={'secondary'}
                      className={s.promoButton}
                      disabled={
                        !cartItems || statusCart === Status.LOADING || inputValue.length === 0
                      }
                    >
                      Apply
                    </Button>
                  ) : (
                    <Button
                      type="reset"
                      variant={'secondary'}
                      className={s.promoButton}
                      disabled={!cartItems || statusCart === Status.LOADING}
                    >
                      Reset
                    </Button>
                  )}
                </form>
              </ThemeProvider>
            </div>
            <div className={s.checkoutBlock}>
              <div>
                <div className={s.subpriceBlock}>
                  <Typography variant={'body'}>Subtotal</Typography>
                  <Typography variant={'body'}>{formatPrice(subTotal || 0)} €</Typography>
                </div>
                <div className={s.totalpriceBlock}>
                  <Typography variant={'body'}>Total</Typography>
                  <Typography variant={'h4'}>
                    {formatPrice(cartData?.totalPrice.centAmount || 0)} €
                  </Typography>
                </div>
              </div>
              <Button className={s.buttonCheckout} disabled={!cartItems?.length}>
                Proceed to checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ClearCart open={openClearCart} setOpen={setOpenClearCart} />
    </main>
  );
};

export default CartPage;
