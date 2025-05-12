import { Box, Modal, Button, Typography } from "@mui/material";
import TableUsers from "./dataTable/TableUsers";
import { useState, useCallback } from "react";
import UsersForm from "./forms/UsersForm";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";

function Users() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const addUser = useCallback(() => {
    navigate("/users");
    handleOpen();
  }, [navigate, handleOpen]);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 500 },
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: "90vh",
    overflowY: "auto",
  };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", p: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Usuarios
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mt={1}>
            Administra los usuarios de la plataforma
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={addUser}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
          aria-label="Agregar nuevo usuario"
        >
          Nuevo registro
        </Button>
      </Box>

      <TableUsers handleOpen={handleOpen} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            pl={2}
            mb={2}
          >
            {id ? "Editar usuario" : "Registrar usuario"}
          </Typography>
          <UsersForm handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
}

export default Users;
