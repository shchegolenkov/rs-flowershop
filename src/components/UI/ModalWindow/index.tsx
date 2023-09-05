import React from 'react';
import s from './ModalWindow.module.scss';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIco from '../../../assets/svg/close.svg';

const ModalWindow = ({
  children,
  open,
  handleClose,
}: {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
}) => {
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
            {children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalWindow;
