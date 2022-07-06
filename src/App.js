import * as React from 'react'
import { useState, useEffect } from 'react'
import DataTable from './components/Table'

export default function App() {
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

    return (
        <>
            {users.map((user) => {
                const { id, name = user.Fullname } = user
                return <p key={id}>{name}</p>
            })}
            <DataTable users={users} />
        </>
    )
}
