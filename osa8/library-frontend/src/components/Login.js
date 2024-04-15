import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { CURRENT_USER, LOGIN } from '../queries'

const Login = ({ show, setToken, setPage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, result] = useMutation(LOGIN, {
        refetchQueries: [{ query: CURRENT_USER }],
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('user-token', token)
        }
    }, [result.data])

    if (!show) {
        return null
    }

    const submit = (event) => {
        event.preventDefault()

        login({ variables: { username, password } })
        setUsername('')
        setPassword('')
        setPage('authors')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username:
                    <input
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password:
                    <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login
