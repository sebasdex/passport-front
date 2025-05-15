import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogAlert from "../DialogAlert";

interface Employee {
  id: number;
  employeeNumber: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  area: string;
}

interface TableEmployeesProps {
  rows: Employee[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const HeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderBottom: "none",
  padding: theme.spacing(2, 3),
}));

const BodyCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  padding: theme.spacing(1.5, 3),
  fontSize: "0.95rem",
  color: theme.palette.text.primary,
}));

const StyledRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  transition: theme.transitions.create("background-color", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TableEmployees({
  rows,
  onEdit,
  onDelete,
}: TableEmployeesProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const iconStyle = {
    color: "grey.600",
    "&:hover": {
      bgcolor: "grey.200",
      color: "grey.800",
      transform: "scale(1.1)",
    },
    transition: "transform 0.2s ease",
  };

  const slice = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper
      sx={{
        width: "100%",
        borderRadius: 3,
        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        border: "1px solid grey.200",
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
    >
      {isDesktop ? (
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="tabla de empleados">
            <TableHead>
              <TableRow>
                {[
                  "N° empleado",
                  "Nombre",
                  "1er Apellido",
                  "2º Apellido",
                  "Correo",
                  "Área",
                  "",
                  "",
                ].map((label, i) => (
                  <HeaderCell
                    key={i}
                    align="left"
                    sx={{ width: i < 6 ? 160 : 60 }}
                  >
                    {label}
                  </HeaderCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {slice.map((row) => (
                <StyledRow key={row.id}>
                  <BodyCell>{row.employeeNumber}</BodyCell>
                  <BodyCell>{row.name}</BodyCell>
                  <BodyCell>{row.firstName}</BodyCell>
                  <BodyCell>{row.lastName}</BodyCell>
                  <BodyCell>{row.email}</BodyCell>
                  <BodyCell>{row.area}</BodyCell>
                  <BodyCell align="center">
                    <IconButton
                      onClick={() => onEdit(row.id)}
                      sx={iconStyle}
                      size="small"
                      aria-label="Editar empleado"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </BodyCell>
                  <BodyCell align="center">
                    <DialogAlert
                      iconButton={
                        <IconButton
                          sx={iconStyle}
                          size="small"
                          aria-label="Eliminar usuario"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      }
                      dialogQuestion="¿Deseas eliminar este empleado?"
                      dialogText="Esta acción eliminará el empleado permanentemente."
                      buttonText="Eliminar"
                      buttonColorText="error"
                      handleConfirm={() => onDelete(row.id)}
                    />
                  </BodyCell>
                </StyledRow>
              ))}
              {slice.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 5 }}>
                    <Typography color="text.secondary" fontWeight={500}>
                      No se encontraron empleados
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Stack spacing={2}>
          {slice.map((row) => (
            <Card key={row.id} variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                  {row.employeeNumber} – {row.name} {row.firstName}{" "}
                  {row.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {row.email} • {row.area}
                </Typography>
                <Stack direction="row" spacing={1} mt={1}>
                  <IconButton
                    onClick={() => onEdit(row.id)}
                    sx={iconStyle}
                    size="small"
                    aria-label="Editar empleado"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <DialogAlert
                    iconButton={<DeleteIcon fontSize="small" sx={iconStyle} />}
                    dialogQuestion="¿Deseas eliminar este empleado?"
                    dialogText="Esta acción eliminará el empleado permanentemente."
                    buttonText="Eliminar"
                    buttonColorText="error"
                    handleConfirm={() => onDelete(row.id)}
                  />
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
      <Box px={!isDesktop ? 2 : 0}>
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_e, p) => setPage(p)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(+e.target.value);
            setPage(0);
          }}
          rowsPerPageOptions={[10, 25, 100]}
          sx={{
            bgcolor: "grey.50",
            borderTop: "1px solid grey.200",
            py: 1,
            "& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
              {
                fontSize: "0.9rem",
                color: "text.secondary",
                fontWeight: 500,
              },
            "& .MuiTablePagination-actions .MuiIconButton-root": {
              color: "primary.main",
              "&:hover": { bgcolor: "primary.light" },
            },
          }}
        />
      </Box>
    </Paper>
  );
}
