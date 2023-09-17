import s from './CartCard.module.scss';
import { useDispatch } from 'react-redux';
import { updateCart } from '../../../app/slices/cart';
import RemoveItemIco from '../../../assets/svg/delItem.svg';
import { LineItem, UpdateCart } from '../../../types/types';
import formatPrice from '../../../utils/formatPrice';
import { Typography } from '../Typography';
import { AppDispatch } from '../../../app/store';

interface ICartCard {
  data: LineItem;
}

const CartCard = ({ data }: ICartCard) => {
  const itemPrice = data.variant.prices[0].value.centAmount;
  const discountItemPrice = data.variant.prices[0].discounted?.value.centAmount || null;
  const dispatch = useDispatch<AppDispatch>();

  async function handleRemoveItem() {
    const updateData: UpdateCart = {
      action: 'removeLineItem',
      lineItemId: data.id,
    };
    await dispatch(updateCart(updateData));
  }

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
            <Typography variant={'subtitle'}>
              {formatPrice(data.totalPrice.centAmount)} €
            </Typography>
          )}
        </div>
        <Typography variant={'h5'}>{formatPrice(data.totalPrice.centAmount)} €</Typography>
      </div>
      <button className={s.removeItemButton} onClick={handleRemoveItem}>
        <RemoveItemIco />
      </button>
    </div>
  );
};
export default CartCard;
