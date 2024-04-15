import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'
import { useApolloClient, useQuery } from '@apollo/client'
import { CURRENT_USER } from './queries'

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)
    const client = useApolloClient()
    const result = useQuery(CURRENT_USER)

    if (result.loading) {
        return <div>loading...</div>
    }

    const currentUser = result.data.me

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
        setPage('authors')
    }
    const Navigation = () => {
        if (token) {
            return (
                <div>
                    <button onClick={() => setPage('authors')}>authors</button>
                    <button onClick={() => setPage('books')}>books</button>
                    <button onClick={() => setPage('add')}>add book</button>
                    <button onClick={() => setPage('recommended')}>
                        recommended
                    </button>
                    <button onClick={() => logout()}>logout</button>
                </div>
            )
        }
        return (
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('login')}>login</button>
            </div>
        )
    }

    return (
        <div>
            <Navigation />

            <Authors show={page === 'authors'} />

            <Books show={page === 'books'} />

            <NewBook show={page === 'add'} />

            <Recommended
                genre={currentUser ? currentUser.favoriteGenre : ''}
                show={page === 'recommended'}
            />

            <Login
                setPage={setPage}
                setToken={setToken}
                show={page === 'login'}
            />
        </div>
    )
}

export default App
