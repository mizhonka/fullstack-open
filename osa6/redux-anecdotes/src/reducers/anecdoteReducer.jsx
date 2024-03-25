import {createSlice} from '@reduxjs/toolkit'
import anecdotes from '../services/anecdotes'

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
        appendAnecdote(state, action){
            state.push(action.payload)
        },
        setAnecdotes(state, action){
            return action.payload.sort((a,b)=>a.votes-b.votes)
        }
    }
})

export const initializeAnecdotes=()=>{
    return async dispatch=>{
        const initial=await anecdotes.getAll()
        dispatch(setAnecdotes(initial))
    }
}

export const createAnecdote=content=>{
    return async dispatch=>{
        const newAnecdote=await anecdotes.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const voteFor=id=>{
    return async dispatch=>{
        await anecdotes.updateVotes(id)
        const all=await anecdotes.getAll()
        dispatch(setAnecdotes(all))
    }
}

export const {appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer
