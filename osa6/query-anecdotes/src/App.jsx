import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { updateVotes } from './services/requests'
import { getAnecdotes } from './services/requests'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient=useQueryClient()
  const dispatch=useNotificationDispatch()

    const updatedAnecdoteMutation=useMutation({mutationFn: updateVotes, onSuccess:()=>{
        queryClient.invalidateQueries({queryKey: ['anecdotes']})
        }})

  const handleVote = (anecdote) => {
    updatedAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
    dispatch({type: 'SHOW', payload: `anecdote '${anecdote.content}' voted`})
    setTimeout(()=>dispatch({type: 'RESET'}), 5000)
    console.log('vote')
  }

  const result=useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if(result.isLoading){
    return (
        <div>
            loading data...
        </div>
    )
  }

  if(result.isError){
    return (
        <div>
            anecdote service not available due to problems in server
        </div>
    )
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
