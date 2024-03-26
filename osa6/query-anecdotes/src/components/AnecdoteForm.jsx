import {useMutation, useQueryClient} from '@tanstack/react-query'
import { createAnecdote } from '../services/requests'

const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = () => {
  const queryClient=useQueryClient()

  const newAnecdoteMutation=useMutation({mutationFn: createAnecdote, onSuccess:()=>{
    queryClient.invalidateQueries({queryKey: ['anecdotes']})
  }})

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content: content, id:getId(), votes: 0})
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
