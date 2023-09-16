import { useNavigate } from 'react-router-dom';
import { Typography } from '../../components/UI/Typography';
import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import FormTheme from '../../themes/FormTheme';
import Button from '../../components/UI/Button';
import CartCard from '../../components/UI/CartCard';
import ClearCartIco from '../../assets/svg/delCart.svg';
import { Cart } from '../../types/types';
import s from './CartPage.module.scss';

const CartPage = () => {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem('cart') as string) as Cart;
  const cartItems = cart?.lineItems || null;

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
            {cartItems ? (
              <div className={s.itemsBlock}>
                <button className={s.buttonClear}>
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
                <form className={s.promoForm}>
                  <TextField
                    defaultValue={''}
                    label={'Promo code'}
                    id={'promocode-input'}
                    className={s.textInput}
                    disabled={!cartItems}
                  />
                  <Button
                    type="submit"
                    variant={'secondary'}
                    className={s.promoButton}
                    disabled={!cartItems}
                  >
                    Apply
                  </Button>
                </form>
              </ThemeProvider>
            </div>
            <div className={s.checkoutBlock}>
              <div>
                <div className={s.subpriceBlock}>
                  <Typography variant={'body'}>Subtotal</Typography>
                  <Typography variant={'body'}>$135</Typography>
                </div>
                <div className={s.totalpriceBlock}>
                  <Typography variant={'body'}>Total</Typography>
                  <Typography variant={'h4'}>$135</Typography>
                </div>
              </div>
              <Button className={s.buttonCheckout} disabled={!cartItems}>
                Proceed to checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
