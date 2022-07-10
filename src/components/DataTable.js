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

export default function UsersDataGrid() {
    console.clear()
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

    // DATA RENDER
    function renderHeaders(array) {
        const result = array.map((item) => {
            return {
                field: 'Field' + item,
                headerName: item,
                width: item === 'User' || item === 'Monthly' ? 140 : 85,
                // editable: false,
            }
        })
        return result
    }

    function renderRows(array, headers) {
        headers = headers.slice(1, headers.length - 1)
        const rows = array.map((user, index) => {
            let result = {
                id: user.id,
                FieldUser: user.Fullname,
            }

            headers.forEach((headerValue, headerIndex) => {
                let day = user.Days.find((day) => {
                    const headerDay = parseInt(headerValue)
                    const currentDay = parseInt(day.Date.split('-')[2])
                    return headerDay === currentDay
                })

                if (day === undefined) {
                    result[`Field${headerIndex + 1}`] = 0
                } else {
                    const startTime =
                        day.Date + ' ' + day.Start.replace('-', ':')
                    const endTime = day.Date + ' ' + day.End.replace('-', ':')
                    result[`Field${headerIndex + 1}`] = timeDiffCalc(
                        endTime,
                        startTime
                    )
                }
            })

            return result
        })
        return rows
    }

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                columns={renderHeaders(headerValues)}
                rows={renderRows(users, headerValues)}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
            />
        </Box>
    )
}
