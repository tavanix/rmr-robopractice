import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import timeDiffCalc from '../utils'
import EnhancedTableHead from './TableHead'

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) {
            return order
        }
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}

function DataTable({ users }) {
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('User')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleChangePage = (event, newPage) => setPage(newPage)

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0

    return (
        <>
            {timeDiffCalc('2021-05-01 14:43', '2021-05-01 13:35')}
            <h1>Users in Social Media Activity Report</h1>
            <Box sx={{ width: '70%' }}>
                <Paper sx={{ width: '50%', mb: 2 }}>
                    <TableContainer sx={{ maxHeight: 550 }}>
                        <Table
                            sx={{ minWidth: 550 }}
                            size={'small'}
                            stickyHeader
                        >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={users.length}
                            />
                            <TableBody>
                                {stableSort(
                                    users,
                                    getComparator(order, orderBy)
                                )
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((user) => {
                                        return (
                                            <TableRow
                                                hover
                                                role='checkbox'
                                                key={user.id}
                                            >
                                                <TableCell
                                                    component='th'
                                                    id={user.id}
                                                    scope='row'
                                                    padding='normal'
                                                >
                                                    {user.Fullname}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {user.id}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 33 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component='div'
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </>
    )
}

export default DataTable
