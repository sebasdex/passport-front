import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Employee {
    id: number;
    employeeNumber: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    area: string;
}


export default function StickyHeadTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState<Employee[]>([]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        try {
            async function fetchData() {
                const response = await fetch('http://localhost:3000/api/getEmployees');
                const data = await response.json();
                setRows(data.employees);
            }
            fetchData();
        } catch (error) {
            console.error('Error al obtener los empleados', error);
        }
    }, []);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" width={200}>Employee Number</TableCell>
                            <TableCell align="left" width={200}>Name</TableCell>
                            <TableCell align="left" width={200}>First Name</TableCell>
                            <TableCell align="left" width={200}>Last Name</TableCell>
                            <TableCell align="left" width={200}>Email</TableCell>
                            <TableCell align="left" width={200}>Area</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        <TableCell align="left" width={200}>{row.employeeNumber}</TableCell>
                                        <TableCell align="left" width={200}>{row.name}</TableCell>
                                        <TableCell align="left" width={200}>{row.firstName}</TableCell>
                                        <TableCell align="left" width={200}>{row.lastName}</TableCell>
                                        <TableCell align="left" width={200}>{row.email}</TableCell>
                                        <TableCell align="left" width={200}>{row.area}</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
