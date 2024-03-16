import { useState, useEffect } from 'react'
import loginService from './services/login'
import Login from './components/Login'
import Blog from './components/Blog'
import Add from './components/Add'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername]=useState('')
    const [password, setPassword]=useState('')
    const [user, setUser]=useState(null)

    const [title, setTitle]=useState('')
    const [author, setAuthor]=useState('')
    const [url, setUrl]=useState('')

    const [successMessage, setSuccessMessage]=useState('')
    const [errorMessage, setErrorMessage]=useState('')

    const updateBlogs=()=>{
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }

    useEffect(() => {
        updateBlogs()
    }, [])

    useEffect(()=>{
    const loggedUserJSON=window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
        const user=JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
        updateBlogs()
    }
    },[])

    const handleUsername=event=>setUsername(event.target.value)
    const handlePassword=event=>setPassword(event.target.value)
    const handleTitle=event=>setTitle(event.target.value)
    const handleAuthor=event=>setAuthor(event.target.value)
    const handleUrl=event=>setUrl(event.target.value)

    const logOut=()=>{
        setTitle('')
        setAuthor('')
        setUrl('')
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    const handleLogin=async event=>{
        event.preventDefault()

        try{
            const user=await loginService.login({username, password})
            setUser(user)
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            updateBlogs()
            setUsername('')
            setPassword('')
            setSuccessMessage('logged in successfully')
            setTimeout(()=>setSuccessMessage(''), 3000)
        } catch (exception) {
            setErrorMessage('wrong username or password')
            setTimeout(()=>setErrorMessage(''), 3000)
        }
    }

    const handleCreate=async event=>{
        event.preventDefault()

        try{
            const blog=await blogService.create({title, author, url})
            updateBlogs()
            setTitle('')
            setAuthor('')
            setUrl('')
            setSuccessMessage(`${title} by ${author} added`)
            setTimeout(()=>setSuccessMessage(''), 3000)
        } catch (exception){
            setErrorMessage('failed to add blog')
            setTimeout(()=>setErrorMessage(''), 3000)
        }
    }

    if(user===null){
    return (
        <div>
            <Notification message={errorMessage} style={'error'}/>
            <h2>login to application:</h2>
            <Login handleLogin={handleLogin} username={username} handleUsername={handleUsername} password={password} handlePassword={handlePassword}/>
        </div>
    )
    }

    return (
    <div>
        <Notification message={errorMessage} style={'error'}/>
        <Notification message={successMessage} style={'success'}/>
        <h2>blogs</h2>
        <div>{user.name} logged in <button onClick={logOut}>logout</button></div>
        <h3>create new</h3>
        <Add handleCreate={handleCreate} title={title} handleTitle={handleTitle} author={author} handleAuthor={handleAuthor} url={url} handleUrl={handleUrl}/>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
    </div>
    )
}

export default App
