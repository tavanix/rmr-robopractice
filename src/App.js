import * as React from 'react'
// import { useState, useEffect } from 'react'
// import DataTable from './components/Table'
import UsersDataGrid from './components/DataTable'

export default function App() {
    // // DATA API
    // const [users, setUsers] = useState([])
    // const url = 'http://localhost:8080/api/users'

    // const getUsers = async () => {
    //     const response = await fetch(url)
    //     const usersData = await response.json()
    //     setUsers(usersData)
    // }

    // useEffect(() => {
    //     getUsers()
    // }, [])

    // return <DataTable users={users} />
    return <UsersDataGrid />
}
