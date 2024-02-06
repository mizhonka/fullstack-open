import axios from 'axios'
const baseUrl='http://localhost:3001/api/persons'

const getAll=()=>{
    const request = axios.get(baseUrl)
    return request.then(request=>request.data)
}

const create=person=>{
    const request=axios.post(baseUrl, person)
    return request.then(request=>request.data)
}

const deletePerson=id=>{
    const request=axios.delete(`${baseUrl}/${id}`)
    return request.then(request=>request.data)
}

const update=(id, changedPerson)=>{
    const request=axios.put(`${baseUrl}/${id}`, changedPerson)
    return request.then(request=>request.data)
}

export default
{
    getAll,
    create,
    deletePerson,
    update
}
