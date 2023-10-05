import React from "react";
import { Snackbar, Alert } from "@mui/material";

export const Messages = ({ message = null, onClose }) => {
  const [open, setOpen] = React.useState(Boolean(message));
  const handleClose = () => {
    setOpen(false);
    onClose(null);
  };
  return (
    <Snackbar
      open={Boolean(message)}
      autoHideDuration={12000}
      onClose={handleClose}
    >
      <Alert severity={message.type} onClose={handleClose}>
        {message.text}
      </Alert>
    </Snackbar>
  );
};