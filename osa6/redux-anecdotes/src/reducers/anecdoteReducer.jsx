import {createSlice} from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        createAnecdote(state, action){
            const content = asObject(action.payload)
            state.push(content)
            return state.sort((a,b)=>a.votes-b.votes)
        },
        voteFor(state, action){
            const id=action.payload
            const votedAnecdote=state.find(a=>a.id===id)
            const newAnecdote={
                ...votedAnecdote,
                votes: votedAnecdote.votes+1
            }
            return state.map(a=>a.id===id ? newAnecdote : a).sort((a,b)=>a.votes-b.votes)
        },
        appendAnecdote(state, action){
            state.push(asObject(action.payload))
        },
        setAnecdotes(state, action){
            return action.payload
        }
    }
})

export const {createAnecdote, voteFor, appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer
