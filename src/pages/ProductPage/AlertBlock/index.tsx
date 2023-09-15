import React from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { Status } from '../../../types/types';

interface AlertBlock {
  openAlert: boolean;
  setOpenAlert: (value: boolean) => void;
  responseStatus: string;
}

const AlertBlock: React.FC<AlertBlock> = ({ openAlert, setOpenAlert, responseStatus }) => {
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
        {responseStatus === Status.SUCCESS ? 'Cart updated successfuly' : 'Error updating cart'}
      </Alert>
    </Collapse>
  );
};

export default AlertBlock;
