import React from 'react';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';

import CloseIco from '../../../assets/svg/close.svg';

import s from './ModalWindow.module.scss';

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
