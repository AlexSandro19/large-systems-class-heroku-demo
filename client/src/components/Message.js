import React from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const Message = ({
  isOpen,
  onClose,
  autoHideDuration,
  severity,
  text,
}) => {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={isOpen}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
      >
        <MuiAlert onClose={onClose} elevation={6} variant="filled" severity={severity || "info"}>
          {text}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};
