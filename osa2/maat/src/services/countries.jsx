import axios from 'axios'
const baseURL='https://studies.cs.helsinki.fi/restcountries/api/'

const getAll=()=>{
    const request=axios.get(`${baseURL}all`)
    return request.then(request=>request.data)
}

export default
{
    getAll
}
