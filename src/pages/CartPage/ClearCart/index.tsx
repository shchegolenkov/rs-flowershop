import React from 'react';
import Button from '../../../components/UI/Button';
import { LineItem, UpdateCart } from '../../../types/types';
import { clearCart } from '../../../app/slices/cart';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { Typography } from '../../../components/UI/Typography';
import s from './ClearCart.module.scss';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIco from '../../../assets/svg/close.svg';

interface ClearCartProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ClearCart: React.FC<ClearCartProps> = ({ open, setOpen }) => {
  const { cartData } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  async function handleClearCart() {
    const updateData: UpdateCart[] = [];
    if (cartData) {
      cartData.lineItems.forEach((lineItem: LineItem) =>
        updateData.push({ action: 'removeLineItem', lineItemId: lineItem.id })
      );
      await dispatch(clearCart(updateData));
      setOpen(false);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        sx={{
          '& > .MuiBackdrop-root': {
            backgroundColor: 'rgba(18,18,18,0.6)',
          },
        }}
        slotProps={{
          backdrop: {
            timeout: 400,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={{ p: 4, padding: 0 }} className={s.modalContent}>
            <button className={s.closeButton} onClick={handleClose}>
              <CloseIco />
            </button>
            <div className={s.contentContainer}>
              <Typography variant={'h5'}>Are you sure you want to clear your cart?</Typography>
              <div className={s.dialogActions}>
                <Button variant={'secondary'} onClick={handleClearCart} className={s.btnChoice}>
                  YES
                </Button>
                <Button variant={'primary'} onClick={handleClose} className={s.btnChoice}>
                  NO
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ClearCart;
