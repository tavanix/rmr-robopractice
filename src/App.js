import React, { useState, useEffect } from 'react'
import data from './data.json'

function App() {
    const [users, setUsers] = useState([])
    const loadData = () => JSON.parse(JSON.stringify(data))

    useEffect(() => {
        setUsers(loadData)
    }, [])

    return (
        <>
            {users.map((user) => {
                const { id, name = user.Fullname } = user
                return <p key={id}>{name}</p>
            })}
        </>
    )
}

export default App
