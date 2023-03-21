import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { create } from "zustand";

import "./ConfirmDialog.css";

const useConfirmDialogStore = create((set) => ({
  message: "",
  onSubmit: undefined,
  close: () => set({ onSubmit: undefined }),
}));

const ConfirmDialog = () => {
  const { message, onSubmit, close } = useConfirmDialogStore();

  return (
    <div className="confirmDialog">
      <Dialog
        open={Boolean(onSubmit)}
        PaperProps={{ sx: { width: "25%" } }}
        onClose={close}
        maxWidth="sm"
        fullWidth
        className="dialog"
      >
        <DialogTitle>Confirm deletion of product</DialogTitle>
        <Box position="absolute" top={0} right={0} >
          <IconButton onClick={close}>
            <Close />
          </IconButton>
        </Box>
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              if (onSubmit) {
                onSubmit();
              }
              close();
            }}
          >
            OK
          </Button>
          <Button color="primary" variant="outlined" onClick={close}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export const confirmDialog = (message, onSubmit) => {
  useConfirmDialogStore.setState({
    message,
    onSubmit,
  });
};

export default ConfirmDialog;
