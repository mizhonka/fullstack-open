import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteList=()=>{
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => {
        const filterMatch=(anecdote)=>{
            const filter=state['filter']
            const reg=new RegExp(`\S*${filter}\S*`, 'i')
            return reg.test(anecdote.content)
        }

        return state['anecdotes'].filter(filterMatch)
    })

    const vote = (id, content) => {
        console.log('vote', id)
        dispatch(voteFor(id))
        dispatch(setNotification(`you voted '${content}'`))
        setTimeout(()=>dispatch(removeNotification()), 5000)
      }

      return (
        <>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
            </div>
        )}
        </>
      )
}

export default AnecdoteList
