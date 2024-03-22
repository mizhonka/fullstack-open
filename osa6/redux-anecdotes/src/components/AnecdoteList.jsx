import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

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

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteFor(id))
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
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
        )}
        </>
      )
}

export default AnecdoteList
