import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { CURRENT_USER, BOOK_ADDED, ALL_BOOKS } from './queries'

export const updateCache = (cache, query, addedBook) => {
    const uniqByTitle = (a) => {
        let seen = new Set(a)
        return a.filter((item) => {
            let k = item.title
            return seen.has(k) ? false : seen.add(k)
        })
    }

    cache.updateQuery(query, ({ allBooks }) => {
        return {
            allBooks: uniqByTitle(allBooks.concat(addedBook)),
        }
    })
}

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)
    const client = useApolloClient()
    const result = useQuery(CURRENT_USER)

    useSubscription(BOOK_ADDED, {
        onData: ({ data }) => {
            const addedBook = data.data.bookAdded
            window.alert(`${addedBook.title} added`)
            updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
        },
    })

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
