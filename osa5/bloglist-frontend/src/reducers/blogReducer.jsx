import { createSlice } from "@reduxjs/toolkit"
import blogs from "../services/blogs"

const blogSlice=createSlice({
    name: blogs,
    initialState: [],
    reducers: {
        setBlogs(state, action){
            return action.payload.sort((a,b)=>a.votes-b.votes)
        }
    }
})

export const initializeBlogs=()=>{
    return async dispatch=>{
        const initial=await blogs.getAll()
        console.log(initial)
        dispatch(setBlogs(initial))
    }
}

export const {setBlogs} = blogSlice.actions
export default blogSlice.reducer
