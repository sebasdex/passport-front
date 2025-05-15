import { useState } from "react";
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
  name: string;
  firstName: string;
  lastName: string;
}
interface Course {
  id: number;
  courseName: string;
  description: string;
  startDate: string;
  endDate: string | null;
  instructor: string;
  approved: boolean;
  place: string;
  student: Employee;
}
interface TableCoursesProps {
  rows: Course[];
  onEdit: (id?: number) => void;
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
}));

export default function TableCourses({
  rows,
  onEdit,
  onDelete,
}: TableCoursesProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useTheme();
  // Desktop large screens
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  // Date format
  const fmtDate = (d: string | null) =>
    d
      ? new Date(d).toLocaleDateString("es-ES", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "—";

  // Data of current page
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
        // ---------- Desktop: Table ----------
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table
            stickyHeader
            aria-label="tabla de cursos"
            sx={{ tableLayout: "fixed", width: "100%" }}
          >
            <TableHead>
              <TableRow>
                {[
                  "Curso",
                  "Descripción",
                  "Lugar",
                  "Inicio",
                  "Término",
                  "Instructor",
                  "Empleado",
                  "Aprobado",
                  "",
                  "",
                ].map((label) => (
                  <HeaderCell key={label}>{label}</HeaderCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {slice.map((row) => (
                <TableRow hover key={row.id}>
                  <BodyCell>{row.courseName}</BodyCell>
                  <BodyCell>{row.description}</BodyCell>
                  <BodyCell>{row.place}</BodyCell>
                  <BodyCell>{fmtDate(row.startDate)}</BodyCell>
                  <BodyCell>
                    {row.endDate ? fmtDate(row.endDate) : "Pendiente"}
                  </BodyCell>
                  <BodyCell>{row.instructor}</BodyCell>
                  <BodyCell>
                    {`${row.student.name} ${row.student.firstName} ${row.student.lastName}`}
                  </BodyCell>
                  <BodyCell>
                    <Box
                      component="span"
                      sx={{
                        bgcolor: row.approved ? "success.main" : "error.main",
                        color: "common.white",
                        p: 0.5,
                        borderRadius: 0.5,
                        fontSize: "0.75rem",
                      }}
                    >
                      {row.approved ? "Aprobado" : "Denegado"}
                    </Box>
                  </BodyCell>
                  <BodyCell align="center">
                    <IconButton onClick={() => onEdit(row.id)} size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </BodyCell>
                  <BodyCell align="center">
                    <DialogAlert
                      iconButton={
                        <IconButton size="small">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      }
                      dialogQuestion="¿Deseas eliminar este curso?"
                      dialogText="Esta acción es irreversible."
                      buttonText="Eliminar"
                      buttonColorText="error"
                      handleConfirm={() => onDelete(row.id)}
                    />
                  </BodyCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        // ---------- Mobile ----------
        <Stack spacing={2}>
          {slice.map((row) => (
            <Card key={row.id} variant="outlined">
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {row.courseName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                  noWrap
                >
                  {row.place} · {fmtDate(row.startDate)}
                  {row.endDate && ` - ${fmtDate(row.endDate)}`}
                </Typography>
                <Typography variant="body2" noWrap>
                  {row.description}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  mt={1}
                >
                  Instructor: {row.instructor}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Empleado:{" "}
                  {`${row.student.name} ${row.student.firstName} ${row.student.lastName}`}
                </Typography>
                <Box mt={1}>
                  <Box
                    component="span"
                    sx={{
                      bgcolor: row.approved ? "success.main" : "error.main",
                      color: "common.white",
                      p: 0.5,
                      borderRadius: 0.5,
                      fontSize: "0.75rem",
                    }}
                  >
                    {row.approved ? "Aprobado" : "Denegado"}
                  </Box>
                </Box>
                <Stack direction="row" spacing={1} mt={2}>
                  <IconButton onClick={() => onEdit(row.id)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <DialogAlert
                    iconButton={
                      <IconButton size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    }
                    dialogQuestion="¿Deseas eliminar este curso?"
                    dialogText="Esta acción es irreversible."
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

      {/* Pagination */}
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
            },
          }}
        />
      </Box>
    </Paper>
  );
}
