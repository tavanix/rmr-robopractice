import * as React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'

import { renderHeaders, renderRows } from '../utils'

const headerValues = [
    'User',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
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
    'Monthly',
]

export default function UsersDataGrid() {
    const [pageSize, setPageSize] = useState(10)
    const [users, setUsers] = useState([])

    const URL = 'http://localhost:8080/api/users'

    const getUsers = async () => {
        try {
            const response = await fetch(URL)
            const usersData = await response.json()
            setUsers(usersData)
        } catch (error) {
            throw new error(error)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Box sx={{ height: 685, width: '100%' }}>
            <DataGrid
                columns={renderHeaders(headerValues)}
                rows={renderRows(users, headerValues)}
                pagination
                pageSize={pageSize}
                rowsPerPageOptions={[5, 10, 25]}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                disableSelectionOnClick
            />
        </Box>
    )
}
