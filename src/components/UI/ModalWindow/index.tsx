import { ReactNode } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';

import CloseIcon from '@/assets/svg/close.svg';

import s from './ModalWindow.module.scss';

interface ModalWindow {
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
}

const ModalWindow = ({ children, open, handleClose }: ModalWindow) => {
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
              <CloseIcon />
            </button>
            {children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalWindow;
