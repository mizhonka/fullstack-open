import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'
import anecdotes from '../services/anecdotes'

const AnecdoteForm=()=>{
    const dispatch = useDispatch()

    const addNote=async (event)=>{
        event.preventDefault()
        const anecdote=event.target.anecdote.value
        event.target.anecdote.value=''
        const newAnecdote=await anecdotes.createNew(anecdote)
        dispatch(createAnecdote(newAnecdote))
        dispatch(setNotification(`you added '${anecdote}'`))
        setTimeout(()=>dispatch(removeNotification()), 5000)
      }

      return (
        <form onSubmit={addNote}>
            <div><input name='anecdote'/></div>
            <button type='submit'>create</button>
        </form>
      )
}

export default AnecdoteForm
