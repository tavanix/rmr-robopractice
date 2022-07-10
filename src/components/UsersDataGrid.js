import * as React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
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
    const [pageSize, setPageSize] = useState(10)

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

    // DATA RENDER FUNCTIONS
    function renderHeaders(array) {
        const header = array.map((item) => {
            return {
                field: 'Field' + item,
                headerName: item,
                headerClassName: 'header',
                width: item === 'User' ? 150 : item === 'Monthly' ? 125 : 85,
            }
        })
        return header
    }

    function renderRows(array, headers) {
        headers = headers.slice(1, headers.length - 1)
        const rows = array.map((user) => {
            let result = {
                id: user.id,
                FieldUser: user.Fullname,
            }

            let monthlyTotal = []

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
                    const calcTime = timeDiffCalc(endTime, startTime)
                    result[`Field${headerIndex + 1}`] = calcTime
                    monthlyTotal.push(calcTime)
                }
            })

            monthlyTotal = monthlyTotal.map((item) => {
                let hours = item.split(':')[0]
                let minutes = item.split(':')[1]
                let totalMinutes = +hours * 60 + +minutes
                return totalMinutes
            })

            let sumTime = monthlyTotal.reduce((curr, acc) => {
                return (curr += acc)
            }, 0)

            result.FieldMonthly =
                Math.floor(sumTime / 60) + ':' + Math.floor(sumTime % 60)

            return result
        })
        return rows
    }

    // RETURN COMPONENT FOR RENDER
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
                components={{
                    Toolbar: GridToolbar,
                }}
            />
        </Box>
    )
}
