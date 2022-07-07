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

    const monthsDays = [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31',
    ]

    return (
        <>
            <h1>Users in Social Media Activity Report</h1>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
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
                                {users
                                    .slice()
                                    .sort(getComparator(order, orderBy))
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

                                                {user.Days.map((day, index) => {
                                                    const startTime =
                                                        day.Date +
                                                        ' ' +
                                                        day.Start.replace(
                                                            '-',
                                                            ':'
                                                        )
                                                    const endTime =
                                                        day.Date +
                                                        ' ' +
                                                        day.End.replace(
                                                            '-',
                                                            ':'
                                                        )

                                                    let currentDay =
                                                        day.Date.split('-')[2]

                                                    return (
                                                        <TableCell
                                                            key={
                                                                day.Date + index
                                                            }
                                                            align='right'
                                                        >
                                                            {timeDiffCalc(
                                                                endTime,
                                                                startTime
                                                            )}
                                                        </TableCell>
                                                    )
                                                })}
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
