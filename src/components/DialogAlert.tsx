import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface DialogAlertProps {
  iconButton?: JSX.Element | string;
  handleConfirm?: () => void;
  buttonText?: string;
  dialogText?: string;
  dialogQuestion?: string;
  className?: string;
  buttonColorText?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
}

export default function ResponsiveDialog({
  iconButton,
  handleConfirm,
  buttonText,
  dialogText,
  dialogQuestion,
  buttonColorText,
  className
}: DialogAlertProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmAndClose = () => {
    if (handleConfirm) {
      handleConfirm(); // Llama a la función de confirmar
    }
    handleClose(); // Llama a la función para cerrar el diálogo
  };

  return (
    <React.Fragment>
      <button className={className} onClick={handleClickOpen}>{iconButton}</button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="xs"
      >
        <DialogTitle id="responsive-dialog-title">{dialogQuestion}</DialogTitle>
        <DialogContent sx={{ padding: "0 2rem" }}>
          <DialogContentText>{dialogText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmAndClose} autoFocus variant="contained" color={buttonColorText}>

            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
