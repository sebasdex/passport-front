import { Box, Modal, Button, Typography, Stack } from "@mui/material";
import TableUsers from "./dataTable/TableUsers";
import { useState, useCallback } from "react";
import UsersForm from "./forms/UsersForm";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

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
    width: { xs: "90%", sm: 450 },
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
    maxHeight: "90vh",
    overflowY: "auto",
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 4 },
        width: "100%",
      }}
    >
      {/* Header */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography
            variant="h5"
            component="h1"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "1.6rem", md: "2rem" },
              lineHeight: 1.2,
            }}
          >
            Usuarios
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.95rem", md: "1rem" }, mt: 0.5 }}
          >
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
            px: { xs: 2, md: 3 },
            py: { xs: 1, md: 1.5 },
            fontSize: { xs: "0.85rem", md: "1rem" },
            width: { xs: "100%", sm: "auto" },
            maxWidth: { xs: "100%", sm: "none" },
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
          aria-label="Agregar nuevo usuario"
        >
          Nuevo registro
        </Button>
      </Stack>

      {/* Table */}
      <Box
        sx={{
          flex: 1,
          overflowX: "auto",
          width: "100%",
        }}
      >
        <TableUsers handleOpen={handleOpen} />
      </Box>

      {/* Modal */}
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
            mb={2}
            fontWeight="bold"
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
