import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
  useMediaQuery,
} from "@mui/material";

interface DialogAlertProps {
  iconButton: JSX.Element | string;
  handleConfirm: () => void;
  buttonText?: string;
  dialogText: string;
  dialogQuestion: string;
  buttonColorText?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  className?: string;
}

export default function DialogAlert({
  iconButton,
  handleConfirm,
  buttonText = "Confirmar",
  dialogText,
  dialogQuestion,
  buttonColorText = "primary",
  className,
}: DialogAlertProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleConfirmAndClose = () => {
    handleConfirm();
    handleClose();
  };

  const isStringButton = typeof iconButton === "string";

  return (
    <>
      {isStringButton ? (
        <Button
          variant="contained"
          color={buttonColorText}
          onClick={handleClickOpen}
          className={className}
          sx={{ textTransform: "none", fontWeight: "bold" }}
        >
          {iconButton}
        </Button>
      ) : (
        <div onClick={handleClickOpen} style={{ display: "inline-block" }}>
          {iconButton}
        </div>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.25rem",
          }}
        >
          {dialogQuestion}
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            sx={{
              textAlign: "center",
              color: "text.secondary",
              fontSize: "0.95rem",
            }}
          >
            {dialogText}
          </DialogContentText>
        </DialogContent>

        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mt: 1,
            pb: 2,
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            color="primary"
            sx={{
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmAndClose}
            variant="contained"
            color={buttonColorText}
            sx={{
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
