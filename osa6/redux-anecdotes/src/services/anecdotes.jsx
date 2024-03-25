import axios from 'axios';
const baseUrl='http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll=async()=>{
    const response=await axios.get(baseUrl)
    return response.data
}

const createNew=async(content)=>{
    const object={content: content, votes: 0, id: getId()}
    const response=await axios.post(baseUrl, object)
    return response.data
}

const updateVotes=async id =>{
    const object=(await axios.get(`${baseUrl}/${id}`)).data
    const newObject={...object, votes: object.votes+1}
    const response=await axios.put(`${baseUrl}/${id}`, newObject)
    return response
}

export default {getAll, createNew, updateVotes}
