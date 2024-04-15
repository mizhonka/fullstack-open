import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const Authors = (props) => {
    const result = useQuery(ALL_AUTHORS)

    const [name, setName] = useState('')
    const [setBornTo, setBirthyear] = useState('')
    const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    })

    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>loading...</div>
    }

    const authors = result.data.allAuthors

    const submit = (event) => {
        event.preventDefault()
        updateAuthor({ variables: { name, setBornTo } })

        setName('')
        setBirthyear('')
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>set birthyear</h3>
            <form onSubmit={submit}>
                <select onChange={({ target }) => setName(target.value)}>
                    {authors.map((a) => (
                        <option value={a.name} key={a.id}>
                            {a.name}
                        </option>
                    ))}
                </select>
                <div>
                    birthyear
                    <input
                        type="text"
                        value={setBornTo}
                        onChange={({ target }) => setBirthyear(target.value)}
                    />
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default Authors
