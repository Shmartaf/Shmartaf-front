import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, useMediaQuery, useTheme } from "@mui/material";

const CustomModal = ({ isOpen, onClose, children }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog open={isOpen} onClose={onClose} fullScreen={fullScreen} maxWidth="sm" fullWidth>
      <DialogTitle style={{ backgroundColor: theme.palette.primary.main, color: "#fff" }}>
        Information
      </DialogTitle>
      <DialogContent style={{ padding: theme.spacing(2) }}>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
