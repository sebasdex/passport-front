import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface DialogAlertProps {
    iconButton: JSX.Element;
    handleConfirm: () => void;
}

export default function ResponsiveDialog({ iconButton, handleConfirm }: DialogAlertProps) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <button onClick={handleClickOpen}>
                {iconButton}
            </button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"¿Estás seguro de que deseas eliminar este registro?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Si eliminas este registro, no podrás recuperarlo.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm} autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
