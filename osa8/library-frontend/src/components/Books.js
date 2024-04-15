import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'
import { initialGenres, setInitialGenres } from '../initialGenres'

const Books = (props) => {
    const [genre, setGenre] = useState('')
    const result = useQuery(ALL_BOOKS, { variables: genre ? { genre } : {} })
    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>loading...</div>
    }

    const books = result.data.allBooks
    if (!genre && initialGenres.length === 0) {
        setInitialGenres(books)
    }

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>choose genre</h3>
            <select
                defaultValue={genre}
                onChange={({ target }) => setGenre(target.value)}
            >
                {initialGenres.map((g) => (
                    <option key={g} value={g}>
                        {g}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Books
