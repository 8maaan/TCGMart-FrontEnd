import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const ConfirmationDialog = ({ status, onClose, title, context}) => {
  const [open, setOpen] = useState(status);

  useEffect(() => {
    setOpen(status);
  }, [status]);

  const handleClose = (confirmed) => {
    setOpen(false);
    // Pass the status value to the callback function
    onClose && onClose(confirmed);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* The title for the dialog */}
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* Add any additional content here if needed */}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          {/* Options */}
          <Button variant="contained" onClick={() => handleClose(true)} autoFocus>
            Yes
          </Button>
          <Button variant="contained" color="error" onClick={() => handleClose(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
