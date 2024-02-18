import React, { useEffect } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

import { Typography } from '@/components/UI/Typography';
import { Status } from '@/types/types';

interface AlertBlock {
  openAlert: boolean;
  setOpenAlert: (value: boolean) => void;
  responseStatus: string;
}

const AlertBlock: React.FC<AlertBlock> = ({ openAlert, setOpenAlert, responseStatus }) => {
  useEffect(() => {
    if (openAlert) {
      const timer = setTimeout(() => {
        setOpenAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [openAlert, setOpenAlert]);

  return (
    <Collapse in={openAlert}>
      <Alert
        variant="outlined"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpenAlert(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
        severity={responseStatus === Status.SUCCESS ? 'success' : 'error'}
      >
        {responseStatus === Status.SUCCESS ? (
          <Typography>Cart updated successfully</Typography>
        ) : (
          <Typography>Error updating cart</Typography>
        )}
      </Alert>
    </Collapse>
  );
};

export default AlertBlock;
