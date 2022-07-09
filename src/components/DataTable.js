import * as React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import timeDiffCalc from '../utils'

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

const rows = [{ id: 1, User: 'Jon', 1: 45, 2: 2.2 }]

export default function UsersDataGrid() {
    // DATA API
    const [users, setUsers] = useState([])
    const url = 'http://localhost:8080/api/users'

    const getUsers = async () => {
        const response = await fetch(url)
        const usersData = await response.json()
        setUsers(usersData)
    }

    useEffect(() => {
        getUsers()
    }, [])

    // PREPARE DATA FOR RENDER
    function renderHeaders(array) {
        const result = array.map((item) => {
            return {
                field: item,
                headerName: item,
                width: item === 'User' || item === 'Monthly' ? 125 : 85,
                editable: false,
                // type: item !== 'User' ? 'number' : 'text',
            }
        })
        return result
    }

    function renderRows(array) {
        const result = array.map((item) => {
            return {
                id: item.id,
                User: item.Fullname,
            }
        })
        return result
    }

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                columns={renderHeaders(headerValues)}
                rows={renderRows(users)}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
            />
        </Box>
    )
}
