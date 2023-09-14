import s from './CartCard.module.scss';
import RemoveItemIco from '../../../assets/svg/delItem.svg';
import { LineItem } from '../../../types/types';

interface ICartCard {
  data: LineItem;
}

const CartCard = ({ data }: ICartCard) => {
  return (
    <div className={s.cardBlock}>
      <p>{data.name['en-US']}</p>
      <button className={s.removeItemButton}>
        <RemoveItemIco />
      </button>
    </div>
  );
};
export default CartCard;
