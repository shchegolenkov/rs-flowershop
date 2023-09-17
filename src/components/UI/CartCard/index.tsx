import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../../../app/slices/cart';
import { AppDispatch, RootState } from '../../../app/store';
import { LineItem, Status, UpdateCart } from '../../../types/types';
import { Typography } from '../Typography';
import RemoveItemIco from '../../../assets/svg/delItem.svg';
import formatPrice from '../../../utils/formatPrice';
import Counter from '../Counter';
import s from './CartCard.module.scss';

interface ICartCard {
  data: LineItem;
}

const CartCard = ({ data }: ICartCard) => {
  const itemPrice = data.variant.prices[0].value.centAmount;
  const discountItemPrice = data.variant.prices[0].discounted?.value.centAmount || null;
  const dispatch = useDispatch<AppDispatch>();
  const { status: statusCart } = useSelector((state: RootState) => state.cart);

  async function handleRemoveItem() {
    const updateData: UpdateCart = {
      action: 'removeLineItem',
      lineItemId: data.id,
    };
    await dispatch(updateCart(updateData));
  }

  const handleChangeItemQuantity = (action: 'increase' | 'decrease') => async () => {
    try {
      const newQuantity = action === 'increase' ? data.quantity + 1 : data.quantity - 1;
      const updateData: UpdateCart = {
        action: 'changeLineItemQuantity',
        lineItemId: data.id,
        quantity: newQuantity,
      };
      await dispatch(updateCart(updateData));
    } catch (error) {
      console.log('Error changing quantity of the product:', error);
    }
  };

  return (
    <div className={s.cardBlock}>
      <div className={s.imgBlock}>
        <img src={data.variant.images[0].url} className={s.img} alt="logo" />
      </div>
      <div className={s.info}>
        <div className={s.infoBlock}>
          <Typography variant={'h5'}>{data.name['en-US']}</Typography>
          {discountItemPrice ? (
            <div className={s.pricesBlock}>
              <Typography variant={'subtitle'}>{formatPrice(discountItemPrice)} €</Typography>
              <Typography variant={'overline'} className={s.oldPrice}>
                {formatPrice(itemPrice)} €
              </Typography>
            </div>
          ) : (
            <Typography variant={'subtitle'}>{formatPrice(itemPrice)} €</Typography>
          )}
        </div>
        <div className={s.totalBlock}>
          <Counter
            value={data.quantity}
            handleDecrease={handleChangeItemQuantity('decrease')}
            handleIncrease={handleChangeItemQuantity('increase')}
            disableState={statusCart === Status.LOADING}
          />
          <Typography variant={'h5'} className={s.totalPrice}>
            {formatPrice(data.totalPrice.centAmount)} €
          </Typography>
        </div>
      </div>
      <button
        className={s.removeItemButton}
        onClick={handleRemoveItem}
        disabled={statusCart === Status.LOADING}
      >
        <RemoveItemIco />
      </button>
    </div>
  );
};
export default CartCard;
