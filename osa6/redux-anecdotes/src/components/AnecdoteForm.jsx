import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm=()=>{
    const dispatch = useDispatch()

    const addNote=async (event)=>{
        event.preventDefault()
        const anecdote=event.target.anecdote.value
        event.target.anecdote.value=''
        dispatch(createAnecdote(anecdote))
        dispatch(setNotification(`you added '${anecdote}'`, 5000))
      }

      return (
        <form onSubmit={addNote}>
            <div><input name='anecdote'/></div>
            <button type='submit'>create</button>
        </form>
      )
}

export default AnecdoteForm
