import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm=()=>{
    const dispatch = useDispatch()

    const addNote=(event)=>{
        event.preventDefault()
        const anecdote=event.target.anecdote.value
        event.target.anecdote.value=''
        dispatch(createAnecdote(anecdote))
      }

      return (
        <form onSubmit={addNote}>
            <div><input name='anecdote'/></div>
            <button type='submit'>create</button>
        </form>
      )
}

export default AnecdoteForm
